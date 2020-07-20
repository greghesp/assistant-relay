const { database } = require('../.././../../server/helpers/db');
const db = database();

export default async (req, res) => {
  try {
    const responses = await db.get('responses').orderBy('timestamp', 'desc').value();

    res.status(200).send({ responses });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
