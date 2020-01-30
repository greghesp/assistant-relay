const path = require('path');
const express = require('express');
const low = require('lowdb');
const Assistant = require('google-assistant/components/assistant');
const Conversation = require('google-assistant/components/conversation');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./bin/config.json');
const versionAdapter = new FileSync('./bin/version.json');
const {sendTextInput} = require('../helpers/assistant.js');
const {auth, processTokens} = require('../helpers/auth');
const {isUpdateAvailable, updateDetails} = require('../helpers/server');
const {delay} = require('../helpers/misc');


const router = express.Router();

router.post('/checkUpdate', async(req, res) => {
  try {
    const update = await isUpdateAvailable();
    const data = {};
    if(update) {
      const details = await updateDetails();
      data.update = true;
      data.details = details;
    } else {
      data.update = false
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.post('/addUser', async(req, res) => {
  try {
    const db = await low(adapter);
    const userFound =  await db.get('users').find({name: req.body.name}).size().value();
    if(userFound > 0) return res.status(400).send("Username already exists");

    await db.get('users').push(req.body).write();
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
    global.assistants[name] = new Assistant(client);
    await sendTextInput(`broadcast Assistant Relay is setup and running for ${name}`, name);
    res.status(200).send();
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
    res.status(500).send(e.message)
  }
});

router.post('/getConfig', async(req, res, next) => {
  try {
    const db = await low(adapter);
    const data = {};
    data.port = db.get('port').value();
    data.muteStartup = db.get('muteStartup').value();
    data.quietHours = db.get('quietHours').value();
    data.devices = db.get('devices').value();
    data.language = db.get('conversation.lang').value();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e.message)
  }
});

router.post('/updateConfig', async(req, res) => {
  try {
    const db = await low(adapter);
    const promises = [];
    Object.entries(req.body).forEach(([key, val]) => {
      promises.push(db.set(key, val).write());
    });
    await Promise.all(promises);
    res.status(200).json({success: true})
  } catch (e) {
    res.status(500).send(e.message)
  }
});

router.post('/restart', async(req, res) => {
  await delay(3000);
  res.status(200).json({success: true});
  process.exit(1);
});

router.post('/getResponses', async(req, res) => {
  try {
    const db = await low(adapter);
    const responses =  await db.get('responses').orderBy('timestamp','desc').value();
    res.status(200).json({responses});
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.get('/audio', async(req, res) => {
  res.sendFile(path.resolve(__dirname, `../bin/audio-responses/${req.query.v}.wav`));
});

router.get('/users', async(req, res) => {
  try {
    const db = await low(adapter);
    const users =  await db.get('users').value();
    const sendUsers = [];
    users.forEach(u => {
      sendUsers.push(u.name)
    });
    res.status(200).send({users: sendUsers});
  } catch (e) {
    res.status(500).send(e.message)
  }
});

router.get('/version', async(req, res) => {
  try {
    const db = await low(versionAdapter);
    const v = await db.get('version').value();
    console.log(v)
    res.status(200).send({version: v});
  } catch (e) {
    res.status(500).send(e.message)
  }
});


router.post('/deleteUser', async(req, res) => {
  try {
    const db = await low(adapter);
    await db.get('users').remove({name: req.body.name}).write();
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message)
  }
});

module.exports = router;
