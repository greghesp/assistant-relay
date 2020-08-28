const { logger } = require('../../../../server/helpers/logger');

const { isInstalled, command } = require('../.././../../server/helpers/cast');

export default async (req, res) => {
  try {
    await isInstalled();
    await command(req.body);
    res.sendStatus(200);
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'cast - devices' });
    res.status(500).send(e.message);
  }
};
