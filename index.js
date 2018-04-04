//Development

//const SSDP = require('node-ssdp').Server;
const path = require('path');
const express = require('express');
const GoogleAssistant = require('google-assistant');
const GRConfig = require('./config.json');
const async = require('async');
const ip = require('ip');

const app = express();

global.GR = {
  config = {
    conversation: {
      lang: GRConfig.language,
    },
    users: {},
    assistants: {},
    port: GRConfig.port
  },
  returnAudio: false
};

//app.use(express.static(path.join(__dirname, 'xml')));
//app.use(express.static(path.join(__dirname, 'audio')));

//Define SSDP Server Configuration - Disabled
// const ssdpServer = new SSDP({
//   location: 'http://' + require('ip').address() + ':3000/desc.xml',
//   sourcePort: 1900,
//   ssdpTtl: 3,
// });

//Define SSDP USN type - Disabled
//ssdpServer.addUSN('urn:greghesp-com:device:GAssist:1');

//Start SSDP Server - Disabled
//ssdpServer.start(() => console.log('Fired up the SSDP Server for network discovery...'));

const authKeys = GRConfig.users;

GR.defaultAudio = false;
GR.returnAudio;
let assistant;

if(Object.keys(authKeys).length === 0){
  return console.log('No users configured, exiting..');
}

Object.keys(authKeys).forEach(function(k){
  GR.config.users[k] = {};
  GR.config.users[k].keyFilePath = authKeys[k].keyFilePath;
  GR.config.users[k].savedTokensPath = authKeys[k].savedTokensPath;
})

// Endpoint API
app.post('/customBroadcast', require('./routes/customBroadcast'));
app.post('/broadcast', require('./routes/broadcast'));
app.post('/custom', require('./routes/custom'));
app.post('/nestStream', require('./routes/nestStream'));


//Start Express Web Server
app.listen(GR.config.port, () => console.log(`Firing up the Web Server for communication on address ${ip.address()}:${GR.config.port}`))

let users;
let numberUsers = Object.keys(GR.config.users).length;

if( numberUsers > 1){
  Object.keys(config.users).forEach(function(i, idx, array){
    if(idx === 0){
      return users = `${i} `
    }
    if (idx === array.length - 1){
      return users = users + `and ${i}`
    } else {
      users = users + `${i} `
    }
  })
} else {
  Object.keys(GR.config.users).forEach(i => {
    users = i
  })
}

async.forEachOfLimit(GR.config.users, 1, function(i, k, cb){
  let auth = i;
  GR.config.assistants[k] = new GoogleAssistant(i)
  let assistant = GR.config.assistants[k];
  assistant.on('ready', () => cb());
  assistant.on('error', (e) => {
    console.log(`Assistant Error when activating user ${k}. Trying next user`);
    return cb();
  })
}, function(err){
  if(err) return console.log(err.message);
  console.log(`Assistant Relay is now setup and running for ${users}`)
  //sendTextInput(`broadcast Assistant Relay is now setup and running for ${users}`)
})

function checkUser(user) {
  const users = Object.keys(GRConfig.users);
  return users.includes(user.toLowerCase());
}


//Assistant Integration

function startConversation(conversation) {
  conversation
    //.on('audio-data', data => console.log('Got some audio data'))
    .on('response', (text) => {
      if (text) {
        console.log('Google Assistant:', text)
        var newLineSplit = text.split("\n")
        // Ignore lines if Assistant responds with extra interactive data (such as a "See More" web URL)
        if (newLineSplit.length > 1) text = newLineSplit[0]
        if(returnAudio) {
          //console.log(`sendTextInput ${text}`)
          sendTextInput(`broadcast ${text}`);
          returnAudio = false;
        }

      }
    })
    //.on('volume-percent', percent => console.log('New Volume Percent:', percent))
    //.on('device-action', action => console.log('Device Action:', action))
    .on('ended', (error, continueConversation) => {
      if (error) {
        console.log('Conversation Ended Error:', error);
      } else if (continueConversation) {
        //console.log('Support for Actions on Google are not yet supported by Assistant Relay');
        conversation.end();
      } else {
        //console.log('Conversation Complete');
        conversation.end();
      }
    })
    .on('error', (error) => {
      console.log('Conversation Error:', error);
    });
}

function sendTextInput(text, n) {
  console.log(`Received command ${text}`);

  assistant = Object.keys(config.assistants)[0];
  assistant = config.assistants[`${assistant}`];

  config.conversation.textQuery = text;

  if(n) {
    if(!checkUser(n)) {
      console.log(`User not found, using ${Object.keys(config.assistants)[0]}`)
    } else {
      n = n.toLowerCase();
      console.log(`User specified was ${n}`)
      assistant = config.assistants[`${n}`]
    }
  } else {
    console.log(`No user specified, using ${Object.keys(config.assistants)[0]}`)
  }
  assistant.start(config.conversation, startConversation);
}
