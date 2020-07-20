const { logger } = require('../../../../server/helpers/logger');
const crypto = require('crypto');
const { configuration, database } = require('../.././../../server/helpers/db');
const config = configuration();
const db = database();

export default async (req, res) => {
  try {
    console.log(req.body);
    const key = req.body.apiKey;
    db.get('accessControl').pull(key).write();
    res.status(200).send();
  } catch (e) {
    console.error(e);
    logger.log('error', e.message, { service: 'api' });
    res.status(500).send(e.message);
  }
};
