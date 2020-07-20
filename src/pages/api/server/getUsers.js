const { database } = require('../.././../../server/helpers/db');
const db = database();

export default async (req, res) => {
  try {
    const size = db.get('users').size().value();
    const users = db.get('users').value();
    res.status(200).send({ size, users });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
