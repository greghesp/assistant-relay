const GoogleAssistant = require('google-assistant');
const path = require('path');
const express = require('express');
const ip = require('ip');

const startConversation = require('./assistant.js')
const configFile = require('./configurations/config.json');
const configureUsers = require('./configuration').configureUsers;
const setupConfigVar = require('./configuration').setupConfigVar;
const setupAssistant = require('./assistant').setupAssistant;
const sendTextInput = require('./assistant').sendTextInput;

const directory = path.resolve()

const app = express();

const baseConfig = {
  conversation: {
    lang: configFile.language,
  },
  users: {},
  assistants: {},
  port: configFile.port
}
let config;

// Configure users on first run
configureUsers()
.then(() => {
  config = setupConfigVar(baseConfig, configFile.users);
  return setupAssistant(config)
})
.then((string) => {
  sendTextInput(string, null, config)
})
.catch((e) => {
  console.log(e)
})


app.post('/customBroadcast', function (req, res) {
  const command = req.query.text;
  const user = req.query.user;

  sendTextInput(`broadcast ${command}`, user, config);

  res.status(200).json({
      message: `Custom broadcast command executed`,
      command: `broadcast ${command}`
  });
})

app.post('/custom', function (req, res) {
  const converse = req.query.converse;
  const command = req.query.command;
  const user = req.query.user;

  //Check the converse parameter
  sendTextInput(command, user, config, converse)
  .then((response) => {
    res.status(200).json({
        message: `Custom command executed`,
        command: `${command}`,
        data: response
    });
  })
})

app.listen(configFile.port, () => console.log(`Firing up the Web Server for communication on address ${ip.address()}:${configFile.port}`))
