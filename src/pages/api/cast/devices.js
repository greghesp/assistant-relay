const { logger } = require('../../../../server/helpers/logger');

export default async (req, res) => {
  try {
    res.status(200).send(global.devices);
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'cast - devices' });
    res.status(500).send(e.message);
  }
};
