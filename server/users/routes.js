
export default function ({ Meteor, Uploader }) {

  WebApp.connectHandlers.use('/getPros', function (req, res) {
    res.setHeader('Content-type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(Meteor.users.find({ 'profile.type': 'pro' }, { fields: { services: false } }).fetch()));
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
      })
    })
  });
}
