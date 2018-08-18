const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const fs = require("fs");

const adapter = new FileSync('server/configurations/config.json');
const db = low(adapter);

const secretsFolder = 'server/configurations/secrets/';

const self = module.exports = {
  configureUsers: function() {
    return new Promise(resolve => {
      let secrets = [];
      let users = [];

      // loop through the secrets folder. Add new files to newFiles array
      fs.readdirSync(secretsFolder).forEach(file => {
        if(file.split('.').pop() === 'json') secrets.push(file)
      })

      // wipe users
      db.set('users', {}).write();

      // add users to db
      secrets.forEach(file => {
        const name = path.parse(file).name;
        users.push(name);
        db.set(`users[${name}]`, {
          keyFilePath: path.resolve(__dirname, `configurations/secrets/${file}`),
          savedTokensPath: path.resolve(__dirname, `configurations/tokens/${name}-tokens.json`)
        }).write()
      })
      resolve(db.getState())
    })
  }
}
