const  {sendTextInput} = require('../assistant')

module.exports = function(req, res) {
  const command = req.query.text;
  const user = req.query.user;

  sendTextInput(`broadcast ${command}`, user);

  res.status(200).json({
      message: `Custom broadcast command executed`,
      command: `broadcast ${command}`
  });
};
