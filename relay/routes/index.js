const express = require('express');
const low = require('lowdb');
const ip = require('ip');

const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const adapter = new FileSync('./bin/config.json');
const {sendTextInput} = require('../helpers/assistant.js');
const {outputFileStream, isQuietHour, updateResponses, saveHTMLFile} = require('../helpers/server.js');

const router = express.Router();


router.get('/', function(req, res) {
  console.log("Get All")
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
 });

router.post('/assistant', async(req, res) => {
  try {
    const db = await low(adapter);
    const convoData = db.get('conversation').value();
    const port = db.get('port').value();
    const timestamp = Date.now();
    const fileStream = outputFileStream(convoData, timestamp);
    const isQH = await isQuietHour();
    const {user, converse = false, preset} = req.body;
    let {command, broadcast = false} = req.body;
    // console.log(user, converse, preset, command, broadcast)

    const response = {};

    if(preset) {
      broadcast = true;
      switch(preset) {
        case 'wakeup':
          command = `wake up everyone`;
          break;
        case 'breakfast':
          command= `breakfast is ready`;
          break;
        case 'lunch':
          command = `it's lunch time`;
          break;
        case 'dinner':
          command = `dinner is served`;
          break;
        case 'timetoleave':
          command = `its time to leave`;
          break;
        case 'arrivedhome':
          command = `i'm home`;
          break;
        case 'ontheway':
          command = `i'm on the way`;
          break;
        case 'movietime':
          command = `the movie is about to start`;
          break;
        case 'tvtime':
          command = `the show is about to start`;
          break;
        case 'bedtime':
          command = `we should go to bed`;
          break;
        default:
          command = `you selected a preset broadcast, but didn't say which one`;
      }
    }


    if(!command) return res.status(400).json({success:  false, error: "No command given"});
    if(broadcast) command = `broadcast ${command}`;

    if(broadcast && isQH) {
      console.log("Broadcast command received, but quiet hours is enabled");
      return res.status(200).json({
        success: false,
        error: "Quiet Time Enabled - Broadcast command detected"
      });
    }


    const conversation = await sendTextInput(command, user);
    conversation
        .on('audio-data',async(data) => {
          fileStream.write(data);
          response.audio = `/server/audio?v=${timestamp}`
        })
        .on('response', (text) => {
          response.response = text;
          if(converse && isQH === false) {
            const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
            const msg = text.replace(regex, '');
            sendTextInput(`broadcast ${msg}`, user);
          }
        })
        .on('volume-percent', (percent) => {
          // do stuff with a volume percent change (range from 1-100)
        })
        .on('device-action', (action) => {
          // if you've set this device up to handle actions, you'll get that here
        })
        .on('screen-data', (screen) => {
          saveHTMLFile(timestamp, screen.data)
          response.html = `/server/html?v=${timestamp}`
          // if the screen.isOn flag was set to true, you'll get the format and data of the output
        })
        .on('ended', async(error, continueConversation) => {
          if (error) {
            response.success = false;
            response.error = error;
            console.error('Conversation Ended Error:', error);
          }
          else {
            console.log('Conversation Complete');
            response.success = true;
          }
          fileStream.end();
          conversation.end();
          await updateResponses(command, response.response, timestamp);
          res.status(200).json(response);
        })
        .on('error', error => {
          response.success = false;
          response.error = error.message;
          res.status(500).json(response);
          console.error(error)
        });

  } catch (e) {
    console.error(e);
    res.status(500).send(e.message)
  }
});

module.exports = router;
