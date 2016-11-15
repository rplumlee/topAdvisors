
export default function ({ /* Collections */ }) {

  WebApp.connectHandlers.use('/writeReview', function (req, res) {
    res.setHeader('Content-type', 'application/json');
    res.writeHead(200);
    // TODO: Add implemention
    res.end('{}');
  });

}
