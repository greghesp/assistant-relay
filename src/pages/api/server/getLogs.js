const { queryLogs } = require('../../../../server/helpers/logger');

export default async (req, res) => {
  try {
    const filters = req.body.filters;
    const logs = await queryLogs(req.body.options);
    let logData;

    if (filters.level === 'all' && filters.service === 'all') logData = logs.file;
    else if (filters.level === 'all' && filters.service !== 'all') {
      logData = logs.file.filter(({ service }) => service === filters.service);
    } else if (filters.level !== 'all' && filters.service === 'all') {
      logData = logs.file.filter(({ level }) => level === filters.level);
    } else {
      logData = logs.file.filter(
        ({ level, service }) => level === filters.level && service === filters.service,
      );
    }

    res.status(200).send(logData);
  } catch (e) {
    console.error(e);
  }
};
