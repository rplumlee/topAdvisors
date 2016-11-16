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
  res.writeHead(200);
  res.end(Assets.getText('index.html'));
});

WebApp.connectHandlers.use('/profile', function (req, res, next) {
  var pro_slug = req.url.substr(1);
  var currentPro = Meteor.users.findOne({ 'profile.slug': pro_slug }, { fields: { services: false } });
  if (!currentPro) {
    return next();
  }

  var currentCompany = Collections.Companies.findOne({ _id: currentPro.company });
  res.writeHead(200);
  res.end(Swig.render(Assets.getText('profile.html'), { locals: { pro: currentPro, company: currentCompany }}));
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
});
