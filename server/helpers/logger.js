const winston = require('winston');

const logger = winston.createLogger({
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      filename: './logs/assistant-relay.log',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      maxsize: 500000,
      maxFiles: 1,
    }),
  ],
});

function queryLogs(options) {
  return new Promise((res, rej) => {
    return logger.query(options, (error, results) => {
      if (error) rej(error);
      res(results);
    });
  });
}

module.exports = {
  logger,
  queryLogs,
};
