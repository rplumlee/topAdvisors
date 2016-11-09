
export default function ({ Meteor }) {

  WebApp.connectHandlers.use('/getPros', function (req, res) {
    res.setHeader('Content-type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(Meteor.users.find({ 'profile.type': 'pro' }, { fields: { services: false } }).fetch()));
  });
}
