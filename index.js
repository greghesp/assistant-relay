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

//Define Google Assistant Configuration
const config = {
  auth: {
    keyFilePath: path.resolve(__dirname, `${GRConfig.keyFile}`),
    savedTokensPath: path.resolve(__dirname, 'tokens.json'),
  },
  conversation: {
    lang: 'en-US', // defaults to en-US, but try other ones, it's fun!
  },
};

//Define SSDP USN type
ssdpServer.addUSN('urn:greghesp-com:device:GAssist:1');

const app = express()
app.use(express.static(path.join(__dirname, 'xml')));

//Start SSDP Server
ssdpServer.start(function(){
  console.log('Fired up the SSDP Server for network discovery...')
});

// Endpoint API
app.post('/broadcast', function (req, res) {
  sendTextInput(`broadcast ${req.query.text}`)
})

//Start Express Web Server
app.listen(3000, () => console.log('Firing up the Web Server for communication on port 3000'))

//Assistant Integration
const startConversation = (conversation) => {
  conversation
    .on('response', text => console.log('Assistant Response:', text))
    .on('volume-percent', percent => console.log('New Volume Percent:', percent))
    .on('device-action', action => console.log('Device Action:', action))
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
