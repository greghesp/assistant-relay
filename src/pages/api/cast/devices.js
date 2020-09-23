const { logger } = require('../../../../server/helpers/logger');

const { isInstalled, search } = require('../.././../../server/helpers/cast');

export default async (req, res) => {
  try {
    await isInstalled();
    const devices = await search();
    console.log(devices);
    res.status(200).send(devices);
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'cast - devices' });
    res.status(500).send(e.message);
  }
};
