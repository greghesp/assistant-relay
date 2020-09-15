const { logger } = require('../../../../server/helpers/logger');
const { database } = require('../.././../../server/helpers/db');

export default async (req, res) => {
  try {
    const db = database();
    const key = req.body.apiKey;
    await db.get('accessControl').pull(key).write();
    res.sendStatus(200);
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'deleteKey' });
    res.status(500).send(e.message);
  }
};
