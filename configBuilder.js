const prompt = require('prompt');
const fs = require("fs");
const path = require('path');


prompt.start();

prompt.get(['Name', 'Client Secret File Name'], function (err, result) {
  let secret = result['Client Secret File Name'];
  let name = result['Name'];

  if(secret.substr(secret.length - 5) != '.json') {
    secret = `${secret}.json`
  }

  fs.readFile('config.json',(err, data) => {
    if(err) throw err;
      var json = JSON.parse(data)
      var users = json['users'];
      json.users[name] = {
        keyFilePath: path.resolve(__dirname, `${secret}`),
        savedTokensPath: path.resolve(__dirname, `${name}-tokens.json`)
      }

      fs.writeFile("config.json", JSON.stringify(json), (err) => {
        if (err) throw err;
        console.log(`
          Your config file has now been saved!
          When needed, use the username ${name} to send Google Assistant commands from this users account
          `);
      })
  })
});
