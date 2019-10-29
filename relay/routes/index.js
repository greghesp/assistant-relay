const express = require('express');
const low = require('lowdb');
const ip = require('ip');

const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const adapter = new FileSync('./bin/config.json');
const {sendTextInput} = require('../helpers/assistant.js');
const {outputFileStream, isQuietHour, updateResponses} = require('../helpers/server.js');

const router = express.Router();

router.get('/*', function(req, res) {
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
    const {user, converse, preset} = req.body;
    let {command, broadcast} = req.body;
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
          response.audio = `http://${ip.address()}:${port}/server/audio?v=${timestamp}`
        })
        .on('response', (text) => {
          response.response = text;
          if(converse && isQH === false) {
            sendTextInput(`broadcast ${text}`, user);
          }
        })
        .on('volume-percent', (percent) => {
          // do stuff with a volume percent change (range from 1-100)
        })
        .on('device-action', (action) => {
          // if you've set this device up to handle actions, you'll get that here
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
