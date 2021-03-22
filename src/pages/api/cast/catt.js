const { logger } = require('../../../../server/helpers/logger');

const { isInstalled, command } = require('../.././../../server/helpers/cast');

export default async (req, res) => {
  try {
    await isInstalled();
    var commandResponse = await command(req.body);

    res.status(200).send(commandResponse);
  } catch (e) {
    logger.log('error', e, { service: 'api', func: 'cast - devices' });
    res.status(500).send(e);
  }
};
