const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const configAdapter = new FileSync(path.resolve('server/bin', 'config.json'));
const middleware = require('../../../../server/helpers/middleware');

export default async (req, res) => {
  try {
    const db = await low(configAdapter);
    let item = db.get(req.body.item).value();
    await middleware();

    if (req.body.item === 'password') {
      const i = db.get('password').value();
      item = !!i;
    }

    res.status(200).send({ item });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
