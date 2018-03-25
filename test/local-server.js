const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname));

app.get('/7plus112.ipa', (req, res) => {
  res.sendFile(path.resolve(__dirname, './mobilegithub.ipa'));
});

let server;

exports.start = () => {
  server = app.listen(3000);
};

exports.stop = () => {
  server.close();
};
