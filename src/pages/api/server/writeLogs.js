const { logger } = require('../../../../server/helpers/logger');

export default async (req, res) => {
  try {
    const { level = 'info', message, service = 'web' } = req.body.log;

    if (!message) {
      logger.log('error', 'No error message was provided in API request', { service });
      return res.status(400).send({ success: false, message: 'No message provided' });
    }

    logger.log(level, message, { service });
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    logger.log('error', e.message, { service: 'api' });
    res.status(500).send(e.message);
  }
};
