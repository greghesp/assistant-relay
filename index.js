const SSDP = require('node-ssdp').Server;
const path = require('path');
const express = require('express');
const GoogleAssistant = require('google-assistant');
const GRConfig = require('./config.json');
const readline = require('readline');
const async = require('async');
const loader = require('audio-loader');

//Define SSDP Server Configuration
const ssdpServer = new SSDP({
  location: 'http://' + require('ip').address() + ':3000/desc.xml',
  sourcePort: 1900,
  ssdpTtl: 3,
});

const authKeys = GRConfig.users;

const config = {
  conversation: {
    lang: GRConfig.language,
  },
  users: {},
  assistants: {}
}

Object.keys(authKeys).forEach(function(k){
  config.users[k] = {};
  config.users[k].keyFilePath = path.resolve(__dirname, `${authKeys[k]}`);
  config.users[k].savedTokensPath = path.resolve(__dirname, `${k}-tokens.json`);
})

//Define SSDP USN type
ssdpServer.addUSN('urn:greghesp-com:device:GAssist:1');

const app = express()
app.use(express.static(path.join(__dirname, 'xml')));
app.use(express.static(path.join(__dirname, 'audio')));

//Start SSDP Server
ssdpServer.start(function(){
  console.log('Fired up the SSDP Server for network discovery...')
});

// Endpoint API
app.post('/custom', function (req, res) {
  sendTextInput(req.query.command)
  res.status(200).json({
      message: `Custom command executed`,
      command: `${req.query.command}`
  });
})

app.post('/customBroadcast', function (req, res) {
  sendTextInput(`broadcast ${req.query.text}`)
  res.status(200).json({
      message: `Custom broadcast command executed`,
      command: `broadcast ${req.query.text}`
  });
})

app.post('/nestStream', function (req, res) {
  if(req.query.stop) {
    sendTextInput(`Stop ${req.query.chromecast}`);
    res.status(200).json({
        message: `Nest stream command executed`,
        command: `Stop ${req.query.chromecast}`
    });
  }
  sendTextInput(`Show ${req.query.camera} on ${req.query.chromecast}`, req.query.user)
  res.status(200).json({
      message: `Nest stream command executed`,
      command: `Stop ${req.query.chromecast}`
  });
})

app.post('/broadcast', function (req, res) {
  const preset = req.query.preset;
  const user = req.query.user;

  switch(preset) {
    case 'wakeup':
        sendTextInput(`broadcast wake up everyone`, user);

        break;
    case 'breakfast':
        sendTextInput(`broadcast breakfast is ready`, user);
        break;
    case 'lunch':
        sendTextInput(`broadcast it's lunch time`, user);
        break;
    case 'dinner':
        sendTextInput('broadcast dinner is served', user);
        break;
    case 'timetoleave':
        sendTextInput(`broadcast its time to leave`, user);
        break;
    case 'arrivedhome':
        sendTextInput(`broadcast i'm home`, user);
        break;
    case 'ontheway':
        sendTextInput(`broadcast i'm on the way`, user);
        break;
    case 'movietime':
        sendTextInput(`broadcast the movie is about to start`, user);
        break;
    case 'tvtime':
        sendTextInput(`broadcast the show is about to start`, user);
        break;
    case 'bedtime':
        sendTextInput(`broadcast we should go to bed`, user);
        break;
    default:
        sendTextInput(`broadcast you selected a preset broadcast, but didn't say which one`, user);
  }

    res.status(200).json({
        message: `Predefined command executed`,
        command: `${req.query.preset}`
    });
})

//Start Express Web Server
app.listen(3000, () => console.log('Firing up the Web Server for communication on port 3000'))

//Assistant Integration
const startConversation = (conversation) => {
  //
  // loader('http://localhost:3000/bell.wav').then(function(b){
  //   console.log(b)
  // })

  conversation
    .on('audio-data', data => console.log('Got some audio data'))
    .on('response', text => console.log('Assistant is responding', text))
    //.on('volume-percent', percent => console.log('New Volume Percent:', percent))
    //.on('device-action', action => console.log('Device Action:', action))
    .on('ended', (error, continueConversation) => {
      if (error) {
        console.log('Conversation Ended Error:', error);
      } else if (continueConversation) {
        promptForInput();
      } else {
        console.log('Conversation Complete');
        conversation.end();
      }
    })
    .on('error', (error) => {
      console.log('Conversation Error:', error);
    });
};

const sendTextInput = (text, n) => {
  console.log(`Received command ${text}`);

  let assistant = Object.keys(config.assistants)[0];
      assistant = config.assistants[`${assistant}`];
  config.conversation.textQuery = text;

  if(n) {
    console.log(`User specified was ${n}`)
    assistant = config.assistants[`${n}`]
  }
  const f = path.resolve(__dirname, `doorbell.wav`);
  //console.log(f)
  assistant.start(config.conversation, startConversation);
}

async.forEachOfLimit(config.users, 1, function(i, k, cb){
  let auth = i;
  config.assistants[k] = new GoogleAssistant(i)
  let assistant = config.assistants[k];
  assistant.on('ready', () => cb());
  assistant.on('error', (e) => {
    console.log(`Assistant Error when activating user ${k}. Trying next user`);
    return cb();
  })
}, function(err){
  if(err) return console.log(err.message);
    sendTextInput(`broadcast Assistant Relay is now setup and running`)
    //sendTextInput()
})
