const { logger } = require('../../../../server/helpers/logger');
const { trackVersion, removeTracking } = require('../../../../server/helpers/server');
const { configuration } = require('../.././../../server/helpers/db');

export default async (req, res) => {
  try {
    const track = req.body.track;

    if (track) await trackVersion();
    else await removeTracking();

    res.sendStatus(200);
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'setTracking' });
    res.status(500).send(e.message);
  }
};
