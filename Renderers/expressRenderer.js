const renderer = require('./vueServerRenderer')

module.exports = ({ template, req, res }) => {
  renderer({ url: req.url }, template).then(({ html }) => {
    res.end(html)
  }).catch(error => {
    console.log('Error:', error);
    console.log('Context:', { url: req.url });
    if (error.code === 404) {
      res.status(404).send('Page not found.');
    } else {
      res.status(500).send('Internal Server Error.');
    }
  })
}