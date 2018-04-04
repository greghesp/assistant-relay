const Promise = require('bluebird');

module.exports.sendTextInput = (text, user) => {
  console.log(`Received command ${text}`);

  assistant = Object.keys(GR.config.assistants)[0];
  assistant = GR.config.assistants[`${assistant}`];
  GR.config.conversation.textQuery = text;

  if(user) {
    if(!checkUser(user)) {
      console.log(`User not found, using ${Object.keys(GR.config.assistants)[0]}`)
    } else {
      user = user.toLowerCase();
      console.log(`User specified was ${user}`)
      assistant = GR.config.assistants[`${user}`]
    }
  } else {
    console.log(`No user specified, using ${Object.keys(GR.config.assistants)[0]}`)
  }
  
  return assistant.start(GR.config.conversation, startConversation);
}

function startConversation(conversation) {
    return new Promise((resolve, reject) => {
        conversation
          //.on('audio-data', data => console.log('Got some audio data'))
          //.on('volume-percent', percent => console.log('New Volume Percent:', percent))
          //.on('device-action', action => console.log('Device Action:', action))
          .on('response', (text) => {
            if (text) {
              resolve(text);
              var newLineSplit = text.split("\n")
              // Ignore lines if Assistant responds with extra interactive data (such as a "See More" web URL)
              if (newLineSplit.length > 1) text = newLineSplit[0]
              if(GR.returnAudio) {
                //console.log(`sendTextInput ${text}`)
                sendTextInput(`broadcast ${text}`);
                GR.returnAudio = false;
              }
            }
          })
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
    });
}
