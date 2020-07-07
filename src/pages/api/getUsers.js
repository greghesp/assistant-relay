const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const dbAdapter = new FileSync(path.resolve('server/bin', 'db.json'));

export default async (req, res) => {
  try {
    const db = await low(dbAdapter);
    const size = db.get('users').size().value();
    const users = db.get('users').value();
    res.status(200).send({ size, users });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
