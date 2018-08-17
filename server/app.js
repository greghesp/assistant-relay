const GoogleAssistant = require('google-assistant');
const express = require('express');
const bodyParser = require('body-parser');
const FileWriter = require('wav').FileWriter;

const startConversation = require('./assistant.js')
const routes = require('./routes.js');
const dashboard = require('./dashboard.js');
const audio = require('./audio.js');

const configureUsers = require('./configuration').configureUsers;
const setupConfigVar = require('./configuration').setupConfigVar;
const setupAssistant = require('./assistant').setupAssistant;
const sendTextInput = require('./assistant').sendTextInput;

const app = express();
//app.use(bodyParser.json());
app.use('/', routes);
app.use('/dashboard', dashboard)
app.use('/audio', audio)

// Configure users on first run
configureUsers()
.then((config) => {
  global.config = config;
  app.listen(global.config.port);
  return setupAssistant()
})
.catch((e) => {
  console.log(e)
})
