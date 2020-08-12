const { queryLogs } = require('../../../../server/helpers/logger');

export default async (req, res) => {
  try {
    console.log(req.body.options);
    const logs = await queryLogs(req.body.options);
    res.status(200).send(logs);
  } catch (e) {
    console.error(e);
  }
};
