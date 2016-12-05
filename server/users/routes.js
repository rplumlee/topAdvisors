
export default function ({ Meteor, Uploader, Collections, Logger, Flat, Email, Swig }) {

  WebApp.connectHandlers.use('/getPros', function (req, res) {
    var purpose = req.query.purpose;
    var query = { 'profile.type': 'pro' };
    if (purpose) {
      query['$or'] = [ {'profile.personalSpecialty': { $elemMatch: { name: purpose } } }, {'profile.businessSpecialty': { $elemMatch: { name: purpose } } } ];
    }

    res.setHeader('Content-type', 'application/json');
    res.writeHead(200);
    if (req.query.city) {
      var companies = Collections.Companies.find({ 'address.city': req.query.city }).fetch();
      query['company'] = { $in: _.pluck(companies, '_id') };
    }

    res.end(JSON.stringify(Meteor.users.find(query, {
      fields: { services: false },
      transform(user) {
        var reviews = Collections.Reviews.find({ agent: user._id }).fetch();
        var proReview = _.reduce(reviews, function (total, review) { return total + review.rating; }, 0) / reviews.length;
        user.review = Math.round(proReview * 2) / 2;

        user.address = Collections.Companies.findOne({ _id: user.company }).address;

        user.professionalExperience = 'No';
        if (user.licenses && user.licenses.length > 0) {
          user.professionalExperience = (new Date()).getFullYear() - _.min(_.map(user.licenses, function (each) { return parseInt(each.dateEarned, 10); }));
          if (user.professionalExperience > 1) {
            user.professionalExperience += ' Years';
          } else {
            user.professionalExperience += ' Year';
          }
        }
        return user;
      }
    }).fetch()));
  });

  WebApp.connectHandlers.use('/createLead', function (req, res) {
    try {
      var data = '';
      req.on('data', function (chunk) {
        data += chunk;
      });

      req.on('end', Meteor.bindEnvironment(function () {
        Collections.Leads.insert(Flat.unflatten(JSON.parse(data)));
        res.setHeader('Content-type', 'application/json');
        res.writeHead(200);
        res.end();
      }));
    } catch (err) {
      Logger.error(err);
    }
  });

  WebApp.connectHandlers.use('/writeReview', function (req, res) {
    try {
      var data = '';
      req.on('data', function (chunk) {
        data += chunk;
      });

      req.on('end', Meteor.bindEnvironment(function () {

        Collections.Reviews.insert(JSON.parse(data));
        res.setHeader('Content-type', 'application/json');
        res.writeHead(200);
        res.end('{ "success": true }');
      }));
    } catch (err) {
      Logger.error(err);
    }
  });

  WebApp.connectHandlers.use('/upload', function (req, res) {
    var rawData = '';
    req.on('data', function (chunk) {
      rawData += chunk;
    });

    req.on('end', function () {
      Uploader.upload(rawData, function (response) {
        res.setHeader('Content-type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(response));
      });
    });
  });

  WebApp.connectHandlers.use('/proRequest', function (req, res) {
    try {
      var data = '';
      req.on('data', function (chunk) {
        data += chunk;
      });

      var emailHtml = Swig.render(Assets.getText('templates/new-pro.html'), {
        locals: {
          admin: Meteor.settings['NEW_PRO_ADMIN_NAME'],
          pro: JSON.parse(data)
        }
      });

      Email.send({
        to: Meteor.settings['NEW_PRO_ADMIN_EMAIL'],
        from: Meteor.settings['CONTACT_NAME'] + ' <' + Meteor.settings['CONTACT_EMAIL'] + '>',
        subject: 'A pro wants to sign up',
        html: emailHtml
      });

      res.setHeader('Content-type', 'application/json');
      res.writeHead(200);
      res.end('{ "success": true }');
    } catch (err) {
      Logger.error(err);
    }
  });

  WebApp.connectHandlers.use('/contactUs', function (req, res) {
    try {
      var data = '';
      req.on('data', function (chunk) {
        data += chunk;
      });

      var params = JSON.parse(data);
      var emailHtml = Swig.render(Assets.getText('templates/contact-us.html'), {
        locals: {
          query: params
        }
      });

      Email.send({
        to: Meteor.settings['CONTACT_EMAIL'],
        from: params.name + ' <' + params.email + '>',
        subject: params.name + ' submitted a message',
        html: emailHtml
      });

      res.setHeader('Content-type', 'application/json');
      res.writeHead(200);
      res.end('{ "success": true }');
    } catch (err) {
      Logger.error(err);
    }
  });
}
