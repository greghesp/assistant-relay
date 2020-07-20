const { logger } = require('../../../../server/helpers/logger');
const crypto = require('crypto');
const { configuration, database } = require('../.././../../server/helpers/db');
const config = configuration();
const db = database();

export default async (req, res) => {
  try {
    const buf = crypto.randomBytes(32);
    const key = buf.toString('hex');
    console.log(key);
    await db.get('accessControl').push(key).write();
    await config.set('accessControl', true).write();

    res.status(200).send({ key });
  } catch (e) {
    console.error(e);
    logger.log('error', e.message, { service: 'api' });
    res.status(500).send(e.message);
  }
};
