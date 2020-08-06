const { configuration } = require('../.././../../server/helpers/db');

export default async (req, res) => {
  try {
    const db = configuration();

    const promises = [];
    Object.entries(req.body).forEach(([key, val]) => {
      promises.push(db.set(key, val).write());
    });
    await Promise.all(promises);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
