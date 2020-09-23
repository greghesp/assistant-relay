const { logger } = require('../../../../server/helpers/logger');

const { isInstalled, search } = require('../.././../../server/helpers/cast');

export default async (req, res) => {
  try {
    await isInstalled();
    const devices = await search();
    res.status(200).send(devices);
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'cast - devices' });
    res.status(500).send(e.message);
  }
};
