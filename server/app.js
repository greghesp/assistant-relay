const GoogleAssistant = require('google-assistant');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const FileWriter = require('wav').FileWriter;

const ip = require('ip');

const startConversation = require('./assistant.js')
const configFile = require('./configurations/config.json');
const configureUsers = require('./configuration').configureUsers;
const setupConfigVar = require('./configuration').setupConfigVar;
const setupAssistant = require('./assistant').setupAssistant;
const sendTextInput = require('./assistant').sendTextInput;
const audioTest = require('./assistant').audioTest;

const directory = path.resolve()

const app = express();
//app.use(bodyParser.json());

let config;
const baseConfig = {
  conversation: {
    lang: configFile.language,
    audio: {
      sampleRateOut: 24000, // defaults to 24000
    }
  },
  users: {},
  assistants: {},
  port: configFile.port
}

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
  const command = req.body.text;
  const user = req.body.user;

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

app.post('/audio', function (req, res) {
  const command = req.query.command;
  const user = req.query.user;
  var outputFileStream = new FileWriter(path.resolve(__dirname, 'test.wav'), {
    sampleRate: config.conversation.audio.sampleRateOut,
    channels: 1
  });

  audioTest(command, user, config, outputFileStream)
  .then((data) => {
    res.sendFile(path.resolve(__dirname, 'test.wav'))
  })
  .catch((e) => {
    console.log(e)
  })
    // setTimeout(() =>{
    //   res.sendFile(audioFile)
    //   fs.unlink(audioFile, (err) => {
    //       if (err) console.log(err);
    //     });
    // }, 500)


})

app.listen(configFile.port, () => console.log(`Firing up the Web Server for communication on address ${ip.address()}:${configFile.port}`))
