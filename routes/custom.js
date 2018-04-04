module.exports = function(req, res) {
  const converse = req.query.converse;
  const command = req.query.command;
  const user = req.query.user;

  //Check the converse parameter
  if(converse) returnAudio = true;

  sendTextInput(command, user)
  res.status(200).json({
      message: `Custom command executed`,
      command: `${command}`
  });
}
