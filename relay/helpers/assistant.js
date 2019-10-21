const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./bin/config.json');
const Conversation = require('google-assistant/components/conversation');

exports.sendTextInput = function (text, name, converse) {
    return new Promise(async(res, rej) => {
        const db = await low(adapter);
        const convo = await db.get('conversation').value();
        convo.textQuery = text;
        const conversation = new Conversation(global.assistants[name], convo);
        res(conversation)
    })
};