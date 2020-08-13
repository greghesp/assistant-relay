const { logger } = require('../../../../server/helpers/logger');
const { database } = require('../.././../../server/helpers/db');

export default async (req, res) => {
  try {
    const db = database();

    const secret = await db.get('secret').value();
    if (secret.hasOwnProperty('installed')) return res.status(200).send(true);
    else res.status(200).send(false);
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'isSecretSetup' });
    res.status(500).send(e.message);
  }
};
