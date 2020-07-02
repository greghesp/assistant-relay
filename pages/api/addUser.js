const low = require('lowdb');
const { OAuth2Client } = require('google-auth-library');
const path = require('path');
const { auth } = require('../../server/helpers/auth');

const FileSync = require('lowdb/adapters/FileSync');
const dbAdapter = new FileSync(path.resolve('server/bin', 'db.json'));
const configAdapter = new FileSync(path.resolve('server/bin', 'config.json'));

export default async (req, res) => {
  try {
    const db = await low(dbAdapter);
    const config = await low(configAdapter);
    const secret = req.body.secret;
    const userFound = await db.get('users').find({ name: req.body.name }).size().value();
    await config.set('track', req.body.track === 'true').write();
    if (userFound > 0) return res.status(400).send('Username already exists');

    // Save user secrets to database.  Required for initialization on reboot
    const data = req.body;
    delete data.track;
    await db.get('users').push(data).write();

    const oauthClient = new OAuth2Client(
      secret.installed.client_id,
      secret.installed.client_secret,
      secret.installed.redirect_uris[0],
    );

    const url = oauthClient.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/assistant-sdk-prototype'],
    });

    res.status(200).send({ url });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};
