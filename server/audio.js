const express = require('express');
const audio = express.Router();

const path = require('path');

audio.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'response.wav'));
})

module.exports = audio;
