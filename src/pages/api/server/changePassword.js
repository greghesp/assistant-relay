const { logger } = require('../../../../server/helpers/logger');

const { configuration } = require('../.././../../server/helpers/db');

const config = configuration();

export default async (req, res) => {
  try {
    const password = req.body.password;
    await config.set('password', password).write();
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    logger.log('error', e.message, { service: 'api' });
    res.status(500).send(e.message);
  }
};
