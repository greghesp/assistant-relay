const { logger } = require('../../../../server/helpers/logger');

const { startSearch } = require('../.././../../server/helpers/cast-api');

export default async (req, res) => {
  try {
    startSearch();
    res.sendStatus(200);
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'cast - devices' });
    res.status(500).send(e.message);
  }
};
