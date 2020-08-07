const { OAuth2Client } = require('google-auth-library');
const { logger } = require('../../../../server/helpers/logger');

const { configuration, database } = require('../.././../../server/helpers/db');

const config = configuration();

export default async (req, res) => {
  try {
    const db = database();

    const userFound = await db.get('users').find({ name: req.body.name }).size().value();
    const secret = await db.get('secret').value();
    if (userFound > 0) {
      logger.log('warn', 'Failed to add user. Username already exists', { service: 'api' });
      return res.status(400).send('Username already exists');
    }

    // Save user secrets to database.  Required for initialization on reboot
    await db.get('users').push(req.body).write();

    const oauthClient = new OAuth2Client(
      secret.installed.client_id,
      secret.installed.client_secret,
      secret.installed.redirect_uris[0],
    );

    const url = oauthClient.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/assistant-sdk-prototype'],
    });

    logger.log('info', 'User Added - redirecting to sign in page', { service: 'api' });

    res.status(200).send({ url });
  } catch (e) {
    console.error(e);
    logger.log('error', e.message, { service: 'api' });
    res.status(500).send(e.message);
  }
};
