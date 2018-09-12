'use strict';

const readline = require('readline');
const prompt = require('prompt');
const fs = require("fs");
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const config = require('./server/configurations/config.json');

rl.question(`What do you want to do? (Enter 1 or 2):
1) Change port
Number: `, (a) => {
  if(a === '1'){
    rl.close();
    return changePort();
  }
  rl.close();
  return console.log('Invalid Answer, try again');
});

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
