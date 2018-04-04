module.exports = function (req, res) {

    const preset = req.query.preset;
    const user = req.query.user;

    if(req.query.converse) returnAudio = true;

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
}
