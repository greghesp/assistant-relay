const { logger } = require('../../../../server/helpers/logger');
const { database } = require('../.././../../server/helpers/db');

export default async (req, res) => {
  try {
    const db = database();

    const secret = req.body.secret;

    // Save secret to database.  Required for initialization on reboot
    await db.set('secret', secret).write();

    logger.log('info', 'Added Project Secret', { service: 'api', func: 'addSecret' });

    res.sendStatus(200);
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'addSecret' });
    res.status(500).send(e.message);
  }
};
