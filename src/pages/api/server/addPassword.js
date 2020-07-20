const { configuration } = require('../.././../../server/helpers/db');

const config = configuration();

const { logger } = require('../../../../server/helpers/logger');

export default async (req, res) => {
  try {
    const password = req.body.password;
    const pwExist = await config.get('password').value();

    if (pwExist) return res.status(401).send('Password already exists, cannot set.');

    await config.set('password', password).write();
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    logger.log('error', e.message, { service: 'api' });
    res.status(500).send(e.message);
  }
};
