const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const dbAdapter = new FileSync(path.resolve('server/bin', 'db.json'));
// const middleware = require('../../../../server/helpers/middleware');

export default async (req, res) => {
  try {
    const db = await low(dbAdapter);
    const responses = await db.get('responses').orderBy('timestamp', 'desc').value();

    res.status(200).send({ responses });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
