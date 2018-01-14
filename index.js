const SSDP = require('node-ssdp').Server;
const path = require('path');
const express = require('express');
const GoogleAssistant = require('google-assistant');
const GRConfig = require('./config.json');
const readline = require('readline');


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
  auth: {
    keyFilePath: path.resolve(__dirname, `${GRConfig.client_secret}`),
    savedTokensPath: path.resolve(__dirname, 'tokens.json'),  }
}

//Define SSDP USN type
ssdpServer.addUSN('urn:greghesp-com:device:GAssist:1');

const app = express()
app.use(express.static(path.join(__dirname, 'xml')));

//Start SSDP Server
ssdpServer.start(function(){
  console.log('Fired up the SSDP Server for network discovery...')
});

// Endpoint API
app.post('/custom', function (req, res) {
  sendTextInput(req.query.command)
})

app.post('/customBroadcast', function (req, res) {
  sendTextInput(`broadcast ${req.query.text}`)
})

app.post('/nestStream', function (req, res) {
  if(req.query.stop) return sendTextInput(`Stop ${chromecast}`)
  sendTextInput(`Show ${req.query.camera} on ${chromecast}`)
})

app.post('/broadcast', function (req, res) {
  const preset = req.query.preset;

  switch(preset) {
    case 'wakeup':
        sendTextInput(`broadcast wake up everyone`);
        break;
    case 'breakfast':
        sendTextInput(`broadcast breakfast is ready`);
        break;
    case 'lunch':
        sendTextInput(`broadcast it's lunch time`);
        break;
    case 'dinner':
        sendTextInput('broadcast dinner is served');
        break;
    case 'timetoleave':
        sendTextInput(`broadcast its time to leave`);
        break;
    case 'arrivedhome':
        sendTextInput(`broadcast i'm home`);
        break;
    case 'ontheway':
        sendTextInput(`broadcast i'm on the way`);
        break;
    case 'movietime':
        sendTextInput(`broadcast the movie is about to start`);
        break;
    case 'tvtime':
        sendTextInput(`broadcast the show is about to start`);
        break;
    case 'bedtime':
        sendTextInput(`broadcast we should go to bed`);
        break;
    default:
        sendTextInput(`broadcast you selected a broadcast in command but didn't specify one`);
      }
})

//Start Express Web Server
app.listen(3000, () => console.log('Firing up the Web Server for communication on port 3000'))

//Assistant Integration
const startConversation = (conversation) => {
  conversation
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

const sendTextInput = (text) => {
  if(!text) {
    config.conversation.textQuery = 'broadcast Assistant Relay is now running. Enjoy!'
  } else {
    config.conversation.textQuery = text;
  }
  assistant.start(config.conversation, startConversation);
}

const assistant = new GoogleAssistant(config.auth);
  assistant
    .on('ready', ()=> sendTextInput())
    .on('error', (error) => {
      console.log('Assistant Error:', error);
    });
