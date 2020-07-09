const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const dbAdapter = new FileSync(path.resolve('server/bin', 'db.json'));
const { basicAuth } = require('../../../../server/helpers/basicAuth');

export default async (req, res) => {
  try {
    await basicAuth(req, res);

    const db = await low(dbAdapter);
    const responses = await db.get('responses').orderBy('timestamp', 'desc').value();

    res.status(200).send({ responses });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
