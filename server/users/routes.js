
export default function ({ Meteor, Uploader, Collections, Logger, Flat }) {

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
        res.end();
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
}
