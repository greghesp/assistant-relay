const GoogleAssistant = require('google-assistant');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./bin/config.json');
const db = low(adapter);

exports.setupAssistant = function() {
  return new Promise((res, rej) => {

  })
};

exports.sendTextInput = function ({text, name, converse}) {
    return new Promise((res, rej) => {
        const user = db.get('users').find({name: name}).value();
        console.log(user)
    })
};