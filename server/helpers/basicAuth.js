const auth = require('basic-auth');
const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const configAdapter = new FileSync(path.resolve('server/bin', 'config.json'));

export function basicAuth(req, res) {
  return new Promise(async (resolve, reject) => {
    const db = await low(configAdapter);
    const password = await db.get('password').value();

    const credentials = auth(req);

    if (!credentials || !isAuthed(credentials, password)) {
      res.statusCode = 401;
      return res.end('Access denied.');
    }
    return resolve();
  });
}

const isAuthed = function (credentials, password) {
  return credentials.pass === password;
};
