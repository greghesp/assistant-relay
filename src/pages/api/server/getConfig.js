const { database } = require('../.././../../server/helpers/db');

const db = database();

export default async (req, res) => {
  try {
    //await basicAuth();
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
