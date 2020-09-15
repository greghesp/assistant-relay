const { logger } = require('../../../../server/helpers/logger');
const { database } = require('../.././../../server/helpers/db');

export default async (req, res) => {
  try {
    const db = database();
    await db.get('users').remove({ name: req.body.user }).write();
    res.sendStatus(200);
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'deleteUser' });
    res.status(500).send(e.message);
  }
};
