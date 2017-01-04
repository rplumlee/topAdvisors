import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Email } from 'meteor/email';
import Flat from 'flat';
import Swig from 'swig';
import Collections from '/lib/collections';
import lib from '/server/lib';

import logger from './logger';
import uploader from './uploader';
import users from './users';
import leads from './leads';
import activities from './activities';
import reviews from './reviews';
import where from 'node-where';


var context = {
  Meteor,
  Collections,
  Accounts,
  check,
  Match,
  Flat,
  Email,
  Swig
};

Meteor.startup(() => {
  lib.init(context);
  logger(context);
  uploader(context);
  users(context);
  leads(context);
  activities(context);
  reviews(context);
});

if (Meteor.isDevelopment) {
  process.env.MAIL_URL = Meteor.settings.MAIL_URL;
}

WebApp.connectHandlers.use('/home', function (req, res) {
  var ip = req.headers['x-forwarded-for'];
  context.Logger.info(ip);

  // Only for testing purpose in development
  if (Meteor.isDevelopment || !ip) {
    ip = '73.96.105.63';
  }
  var result = Meteor.wrapAsync(where.is)(ip);
  var location = {};
  if (result) {
    location.city = result.get('city');
    location.state = result.get('regionCode');
    location.full = location.city + ', ' + location.state;
  }
  res.writeHead(200);
  res.end(Swig.render(Assets.getText('index.html'), { locals: { location } }));
});

WebApp.connectHandlers.use('/how_it_works', function (req, res) {
  res.writeHead(200);
  res.end(Assets.getText('how_it_works.html'));
});

WebApp.connectHandlers.use('/about', function (req, res) {
  res.writeHead(200);
  res.end(Assets.getText('about.html'));
});

WebApp.connectHandlers.use('/contact-us', function (req, res) {
  res.writeHead(200);
  res.end(Assets.getText('contact-us.html'));
});

WebApp.connectHandlers.use('/for_pros', function (req, res) {
  res.writeHead(200);
  res.end(Assets.getText('for_pros.html'));
});

WebApp.connectHandlers.use('/profile', function (req, res, next) {
  var pro_slug = req.url.substr(1);
  var currentPro = Meteor.users.findOne({ 'profile.slug': pro_slug }, { fields: { services: false } });
  if (!currentPro) {
    return next();
  }

  var currentCompany = Collections.Companies.findOne({ _id: currentPro.company });

  var proSpecialties = [];
  currentPro.profile.personalSpecialty.forEach(function (each) {
    if (!each.name) { return; }
    proSpecialties.push('{ y: ' + each.percent + ', legendText: \"' + each.name + '\" }');
  });
  currentPro.profile.businessSpecialty.forEach(function (each) {
    if (!each.name) { return; }
    proSpecialties.push('{ y: ' + each.percent + ', legendText: \"' + each.name + '\" }');
  });

  var proReviews = Collections.Reviews.find({ agent: currentPro._id }, { sort: { createdOn: -1 } }).fetch();
  res.writeHead(200);
  if (Collections.Activities.findOne({ agent: currentPro._id })) {
    Collections.Activities.update({
      agent: currentPro._id
    }, {
      $inc: {
        count: 1
      }
    }, function (err) {
      if (err) {
        context.Logger.error(err);
      }
    });
  } else {
    Collections.Activities.insert({ agent: currentPro._id, count: 1 });
  }

  res.end(Swig.render(Assets.getText('profile.html'), { locals: { pro: currentPro, company: currentCompany, reviews: proReviews, specialties: '[' + proSpecialties.join(', ') + ']' }}));
});
