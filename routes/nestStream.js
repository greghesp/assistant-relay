module.exports = function (req, res) {
  if(req.query.converse) returnAudio = true;

  if(req.query.stop) {
    sendTextInput(`Stop ${req.query.chromecast}`);
    return res.status(200).json({
        message: `Nest stream command executed`,
        command: `Stop ${req.query.chromecast}`
    });
  }

  sendTextInput(`Show ${req.query.camera} on ${req.query.chromecast}`, req.query.user)
  res.status(200).json({
      message: `Nest stream command executed`,
      command: `Show ${req.query.camera} on ${req.query.chromecast}`
  });
}
