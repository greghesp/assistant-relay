const low = require('lowdb');
const path = require('path');
const Assistant = require('google-assistant/components/assistant');
const { OAuth2Client } = require('google-auth-library');

const { sendTextInput } = require('../../../server/helpers/assistant');
const { trackVersion } = require('../../../server/helpers/server');

const FileSync = require('lowdb/adapters/FileSync');
const dbAdapter = new FileSync(path.resolve('server/bin', 'db.json'));

export default async (req, res) => {
  try {
    const db = await low(dbAdapter);

    const oauthCode = req.body.oauthCode;
    const name = req.body.name;

    const user = await db.get('users').find({ name }).value();
    const key = user.secret.installed;
    const oauthClient = new OAuth2Client(key.client_id, key.client_secret, key.redirect_uris[0]);
    const r = await oauthClient.getToken(oauthCode);

    oauthClient.setCredentials(r.tokens);

    await db.get('users').chain().find({ name: name }).assign({ tokens: r.tokens }).write();

    await trackVersion();

    global.assistants[name] = new Assistant(oauthClient);

    await sendTextInput(`broadcast Assistant Relay is setup and running for ${name}`, name);

    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};
