const { logger } = require('../../../../server/helpers/logger');
const { trackVersion, removeTracking } = require('../../../../server/helpers/server');
const { configuration } = require('../.././../../server/helpers/db');

export default async (req, res) => {
  try {
    const config = configuration();
    const track = req.body.track;

    if (track) {
      const { data } = await trackVersion();
      await config.set('trackID', data.uid).write();
    } else {
      const uid = config.get('trackID').value();
      await removeTracking(uid);
      await config.set('trackID', null).write();
    }

    res.sendStatus(200);
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'setTracking' });
    res.status(500).send(e.message);
  }
};
