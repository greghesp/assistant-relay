const { logger } = require('../../../../server/helpers/logger');

const { configuration } = require('../.././../../server/helpers/db');

export default async (req, res) => {
  try {
    const config = configuration();

    const track = req.body.track;
    await config.set('track', track).write();
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    logger.log('error', e.message, { service: 'api' });
    res.status(500).send(e.message);
  }
};
