const fs = require("fs");
const path = require('path');

const secretsFolder = 'server/configurations/secrets/';
const config = require('./configurations/config.json');

module.exports = {
  configureUsers: function() {
    return new Promise(resolve => {
      let secrets = [];
      let users = [];

      // loop through the secrets folder. Add new files to newFiles array
      fs.readdirSync(secretsFolder).forEach(file => {
        secrets.push(file)
      })

      // read in the configuration file for editing
      fs.readFile("server/configurations/config.json",(err, data) => {
        if(err) throw err;
        var json = JSON.parse(data)
            json['users'] = {}

        // go through each file and generate a config file entry
        secrets.forEach(file => {
          const name = path.parse(file).name;
          users.push(name);
          json.users[name] = {
            keyFilePath: path.resolve(__dirname, `configurations/secrets/${file}`),
            savedTokensPath: path.resolve(__dirname, `configurations/tokens/${name}-tokens.json`)
          }
        })

        // write new config file
        fs.writeFile("server/configurations/config.json", JSON.stringify(json, null, 2), (err) => {
          if (err) throw err;
          console.log(`Configured users are:${users.map(u => ` ${u}`)}`);
          resolve();
        })
      })
    })
  },

  setupConfigVar: function(config, authKeys) {
    Object.keys(authKeys).forEach(function(k){
      config.users[k] = {};
      config.users[k].keyFilePath = authKeys[k].keyFilePath;
      config.users[k].savedTokensPath = authKeys[k].savedTokensPath;
    })
    return config;
  }
}
