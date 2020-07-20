const { logger } = require('../../../../server/helpers/logger');
const { configuration } = require('../.././../../server/helpers/db');
const config = configuration();

export default async (req, res) => {
  try {
    const control = await config.get('passwordLock').value();

    res.status(200).send({ passwordEnabled: control });
  } catch (e) {
    console.error(e);
    logger.log('error', e.message, { service: 'api' });
    res.status(500).send(e.message);
  }
};
