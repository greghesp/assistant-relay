const winston = require('winston');

const logger = winston.createLogger({
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      filename: './logs/assistant-relay.log',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      maxSize: '1m',
    }),
  ],
});

module.exports = {
  logger,
};
