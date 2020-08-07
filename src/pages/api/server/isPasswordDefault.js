const { logger } = require('../../../../server/helpers/logger');
const { configuration } = require('../.././../../server/helpers/db');
const config = configuration();

export default async (req, res) => {
  try {
    const pw = await config.get('password').value();

    if (pw === 'assistant') return res.status(200).send(true);
    else res.status(200).send(false);
  } catch (e) {
    console.error(e);
    logger.log('error', e.message, { service: 'api' });
    res.status(500).send(e.message);
  }
};
