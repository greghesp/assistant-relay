const { logger } = require('../../../../server/helpers/logger');

const { cast } = require('../.././../../server/helpers/cast-api');

export default async (req, res) => {
  try {
    await cast(req.body);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    logger.log('error', e.message, { service: 'api', func: 'cast - devices' });
    res.status(500).send(e.message);
  }
};