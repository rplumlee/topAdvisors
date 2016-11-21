
export default function ({ Meteor, Uploader, Collections, Logger, Flat, Email, Swig }) {

  WebApp.connectHandlers.use('/getPros', function (req, res) {
    res.setHeader('Content-type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(Meteor.users.find({ 'profile.type': 'pro' }, { fields: { services: false } }).fetch()));
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
