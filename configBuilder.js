'use strict';

const readline = require('readline');
const prompt = require('prompt');
const fs = require("fs");
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`What do you want to do? (Enter 1 or 2):
1) Add User
2) Change port
Number: `, (a) => {
  if(a === '1'){
    rl.close();
    return addUser();
  }
  if(a === '2') {
    rl.close();
    return changePort();
  }
  rl.close();
  return console.log('Invalid Answer, try again');
});


function addUser() {
  prompt.get(['Name', 'Client Secret File Name'], function (err, result) {
    let secret = result['Client Secret File Name'];
    let name = result['Name'].toLowerCase();

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
}

function changePort(){
  prompt.get(['Port'], function (err, result) {
    let p = result['Port'];

    if(!p) {
      p = '3000';
      console.log('No port defined')
    }

    fs.readFile('config.json',(err, data) => {
      if(err) throw err;
        var json = JSON.parse(data)
        json['port'] = p;

        fs.writeFile("config.json", JSON.stringify(json), (err) => {
          if (err) throw err;
          console.log(`
            Your config file has now been saved!
            Using port numer ${p}
            `);
        })
    })
  });
}
