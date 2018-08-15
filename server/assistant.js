const async = require('async');
const GoogleAssistant = require('google-assistant');

const defaultAudio = false;
let returnAudio;
let gConfig;

var self = module.exports = {
  setupAssistant: function(config) {
    return new Promise((resolve, reject) => {
      let users = []
      async.forEachOfLimit(config.users, 1, function(i, k, cb){
        let auth = i;
        users.push(k)
        config.assistants[k] = new GoogleAssistant(i)
        let assistant = config.assistants[k];
        assistant.on('ready', () => cb());
        assistant.on('error', (e) => {
          console.log(`Assistant Error when activating user ${k}. Trying next user`);
          return cb();
        })
      }, function(err){
        if(err) return reject(err.message);
        console.log(`Assistant Relay is now setup and running for${users.map(u => ` ${u}`)}`)
        resolve('broadcast Assistant Relay is now setup and running')
      })
    })
  },

  sendTextInput: function(text, n, config, converse) {
    console.log(`Received command ${text}`);
    if(converse) returnAudio = true;
    gConfig = config;
    // set default assistant to first user
    assistant = Object.keys(config.assistants)[0];
    assistant = config.assistants[`${assistant}`];

    // set the conversation query to text
    config.conversation.textQuery = text;

    // check to see if user passed exists
    if(n) {
      const users = Object.keys(config.users);
      if(!users.includes(n.toLowerCase())) {
        console.log(`User not found, using ${Object.keys(config.assistants)[0]}`)
      } else {
        n = n.toLowerCase();
        console.log(`User specified was ${n}`)
        assistant = config.assistants[`${n}`]
      }
    } else {
      console.log(`No user specified, using ${Object.keys(config.assistants)[0]}`)
    }
     assistant.start(config.conversation, self.startConversation);
  },

  startConversation: function(conversation) {
    let response;
    return new Promise((resolve, reject) => {
      conversation
        //.on('audio-data', data => console.log('Got some audio data'))
        .on('response', (text) => {
          if (text) {
            console.log('Google Assistant:', text)
            response = text;
            if(returnAudio) {
              self.sendTextInput(`broadcast ${text}`, null, gConfig);
              returnAudio = false;
            }
          }
        })
        .on('volume-percent', percent => console.log('New Volume Percent:', percent))
        .on('device-action', action => console.log('Device Action:', action))
        .on('ended', (error, continueConversation) => {
          if (error) {
            console.log('Conversation Ended Error:', error);
            reject(error)
          } else if (continueConversation) {
            console.log('Continue the conversation... somehow');
            conversation.end();
            resolve();
          } else {
            console.log('Conversation Complete');
            conversation.end();
            resolve(response);
          }
        })
        .on('error', (error) => {
          console.log('Conversation Error:', error);
          reject(error)
        });
    })
  }
}
