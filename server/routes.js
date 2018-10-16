const express = require('express');
const routes = express.Router();

const sendTextInput = require('./assistant').sendTextInput;
const sendAudioInput = require('./assistant').sendAudioInput;


routes.post('/assistant', function (req, res) {
  let command = req.body.command;
  let broadcast = req.body.broadcast;
  const user = req.body.user;
  const converse = req.body.converse;
  const preset = req.body.preset;

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

  //if no command passed, return 400
  if(!command) return res.status(400).json({success: false, error: "No command given"})

  // if broadcast is true, pass as broadcast command
  if(broadcast) command = `broadcast ${command}`;

  sendTextInput(command, user, converse)
  .then((response) => {
    res.status(200).json(response);
  })
  .catch((err) => {
    res.status(400).json(err);
  })
})

routes.post('/t', (req, res) => {
  sendAudioInput();
})

module.exports = routes;
