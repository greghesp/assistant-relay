const { logger } = require('../../../../server/helpers/logger');
const { database } = require('../.././../../server/helpers/db');

export default async (req, res) => {
  try {
    const db = database();
    const keys = await db.get('accessControl').value();
    res.status(200).send({ apiKeys: keys });
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'getKeys' });
    res.status(500).send(e.message);
  }
};
