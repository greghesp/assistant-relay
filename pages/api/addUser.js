const low = require('lowdb');
const path = require('path');
const { auth } = require('../../server/helpers/auth');

const FileSync = require('lowdb/adapters/FileSync');
const dbAdapter = new FileSync(path.resolve('server/bin', 'db.json'));

export default async (req, res) => {
  try {
    const db = await low(dbAdapter);
    const userFound = await db.get('users').find({ name: req.body.name }).size().value();
    if (userFound > 0) return res.status(400).send('Username already exists');

    // ToDo:  Not sure is secret is needed after authentication?
    await db.get('users').push(req.body).write();
    const url = await auth(req.body.secret, req.body.name);
    res.status(200).send({ url });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
