const Assistant = require('google-assistant/components/assistant');
const { OAuth2Client } = require('google-auth-library');

const { sendTextInput } = require('../../../../server/helpers/assistant');
const { trackVersion } = require('../../../../server/helpers/server');

const { database } = require('../.././../../server/helpers/db');

export default async (req, res) => {
  try {
    const db = database();

    const oauthCode = req.body.oauthCode;
    const name = req.body.name;

    const secret = await db.get('secret').value();

    const key = secret.installed;
    const oauthClient = new OAuth2Client(key.client_id, key.client_secret, key.redirect_uris[0]);
    const r = await oauthClient.getToken(oauthCode);

    oauthClient.setCredentials(r.tokens);

    await db.get('users').chain().find({ name: name }).assign({ tokens: r.tokens }).write();

    await trackVersion();

    global.assistants[name] = new Assistant(oauthClient);

    //await sendTextInput(`broadcast Assistant Relay is setup and running for ${name}`, name);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};
