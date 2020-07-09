const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const configAdapter = new FileSync(path.resolve('server/bin', 'config.json'));
//const basicAuth = require('basic-auth');

export default async (req, res) => {
  try {
    //await basicAuth();
    const db = await low(configAdapter);
    let item = db.get(req.body.item).value();

    if (req.body.item === 'password') {
      const i = db.get('password').value();
      item = !!i;
    }

    res.status(200).send({ item });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
