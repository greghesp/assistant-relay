const { logger } = require('../../../../server/helpers/logger');

const { configuration } = require('../.././../../server/helpers/db');

const config = configuration();

export default async (req, res) => {
  try {
    const password = req.body.password;
    if (password === 'assistant') throw 'Password cannot be "assistant"';
    await config.set('password', password).write();
    res.sendStatus(200);
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'changePassword' });
    res.status(500).send(e.message);
  }
};
