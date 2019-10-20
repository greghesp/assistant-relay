const path = require('path');
const express = require('express');
const low = require('lowdb');
const Assistant = require('google-assistant/components/assistant');
const Conversation = require('google-assistant/components/conversation');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./bin/config.json');
const {sendTextInput} = require('../helpers/assistant.js');
const {auth, processTokens} = require('../helpers/auth');


const router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

router.post('/addUser', async(req, res) => {
  try {
    const db = await low(adapter);
    db.get('users').push(req.body).write();
    const url = await auth(req.body.secret, req.body.name);
    res.status(200).send({url});
  } catch (e) {
    res.status(500).send(e.message)
  }
});

router.post('/processOAuth', async(req, res) => {
  try {
    const oauthCode = req.body.oauthCode;
    const name = req.body.name;
    const client = await processTokens(oauthCode, name);
    let assistant = new Assistant(client);
    const db = await low(adapter);
    const convo = db.get('conversation').value();
    convo.textQuery = "broadcast hello";
    await new Conversation(assistant, convo);
    res.status(200);
  } catch (e) {
    res.status(500).send(e.message)
  }
});

router.post('/userCount',async(req, res) => {
  try {
    const db = await low(adapter);
    const size = db.get('users').size().value();
    res.status(200).send({size});
  } catch (e) {
    console.log(e)
    res.status(500).send(e.message)
  }
})

router.post('/getConfig', async(req, res, next) => {
  try {
    const db = await low(adapter);
    const data = {};
    data.port = db.get('port').value();
    data.muteStartup = db.get('muteStartup').value();
    data.quietHours = db.get('quietHours').value();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e.message)
  }
});




module.exports = router;
