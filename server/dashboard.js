const express = require('express');
const dashboard = express.Router();

const sendTextInput = require('./assistant').sendTextInput;
const audioTest = require('./assistant').audioTest;


dashboard.get('/customBroadcast', function (req, res) {
  const command = req.body.text;
  const user = req.body.user;

  sendTextInput(`broadcast ${command}`, user, config);

  res.status(200).json({
      message: `Custom broadcast command executed`,
      command: `broadcast ${command}`
  });
})




module.exports = dashboard;
