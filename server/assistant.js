const async = require('async');
const GoogleAssistant = require('google-assistant');
const FileWriter = require('wav').FileWriter;

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
        resolve()
        //resolve('broadcast Assistant Relay is now setup and running')
      })
    })
  },

  sendTextInput: function(text, n, config, converse) {
    return new Promise((resolve, reject) => {
      gConfig = config
      console.log(`Received command ${text}`);
      if(converse) returnAudio = true;
      // set the conversation query to text
      gConfig.conversation.textQuery = text;
      const assistant = self.setUser(gConfig, n)

       assistant.start(config.conversation, (conversation) => {
          return self.startConversation(conversation)
          .then((data) => {
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
        });
    })
  },

  // audioTest: function(text, n, config, audio) {
  //   console.log(`Received command ${text}`);
  //   return new Promise(resolve => {
  //     config.conversation.textQuery = text;
  //     const assistant = self.setUser(config, n)
  //
  //      assistant.start(config.conversation, (conversation) => {
  //         return self.startConversation(conversation, audio)
  //       });
  //   })
  // },

  startConversation: function(conversation, outputFileStream) {
    let response = {};
    return new Promise((resolve, reject) => {
      conversation
        // .on('audio-data', data => {
        //   if(outputFileStream) outputFileStream.write(data)
        // })
        .on('response', (text) => {
          if (text) {
            console.log('Google Assistant:', text)
            response.response = text;
            if(returnAudio) {
              self.sendTextInput(`broadcast ${text}`, null, gConfig);
              returnAudio = false;
            }
          }
        })
        .on('volume-percent', percent => {
          console.log('New Volume Percent:', percent)
          response.response = `New Volume Percent is ${percent}`;
        })
        .on('device-action', action => {
          console.log('Device Action:', action)
          response.response = `Device Action is ${action}`;
        })
        .on('ended', (error, continueConversation) => {
          if (error) {
            console.log('Conversation Ended Error:', error);
            response.false = true;
            reject(response)
          } else if (continueConversation) {
            response.success = true;
            console.log('Continue the conversation... somehow');
            conversation.end();
            resolve();
          } else {
            response.success = true;
            console.log('Conversation Complete');
            // if(outputFileStream) outputFileStream.end()
            conversation.end();
            resolve(response);
          }
        })
        .on('error', (error) => {
          reject(error)
        });
    })
  },

  setUser: function(config, n) {
    // set default assistant to first user
    assistant = Object.keys(config.assistants)[0];
    assistant = config.assistants[`${assistant}`];

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

    return assistant;
  }
}
