const { logger } = require('../../../../server/helpers/logger');

export default async (req, res) => {
  try {
    const { level = 'info', message, service = 'web', func = null } = req.body;

    if (!message) {
      logger.log('error', 'No error message was provided in API request', {
        service,
        func: 'writeLogs',
      });
      return res.status(400).send({ success: false, message: 'No message provided' });
    }

    logger.log(level, message, { service, func });
    res.sendStatus(200);
  } catch (e) {
    logger.log('error', e.message, { service: 'api', func: 'writeLogs' });
    res.status(500).send(e.message);
  }
};
