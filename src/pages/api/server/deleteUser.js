const { logger } = require('../../../../server/helpers/logger');
const { configuration, database } = require('../.././../../server/helpers/db');

export default async (req, res) => {
  try {
    const db = database();
    await db.get('users').remove({ name: req.body.user }).write();
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    logger.log('error', e.message, { service: 'api' });
    res.status(500).send(e.message);
  }
};
