const { database } = require('../.././../../server/helpers/db');
const db = database();

export default async (req, res) => {
  try {
    const size = db.get('users').size().value();
    const users = db.get('users').value();
    const usersToSend = [];
    users.forEach(u => usersToSend.push(u.name));

    res.status(200).send({ size, users: usersToSend });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
