const path = require('path')
const fs = require('fs')
const express = require('express');

const server = express();
const renderer = require('../Renderers/expressRenderer')
const template = fs.readFileSync('./ClientApp/index.template.html', 'utf-8')

server.use('/dist', express.static(path.resolve(__dirname, '../wwwroot/dist')));

server.get('*', (req, res) => {
  renderer({ req, res, template });
});

server.listen(8080, () => {
  console.log('Server is running on 8080.');
});
