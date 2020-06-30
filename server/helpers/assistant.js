const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./bin/config.json');
const Conversation = require('google-assistant/components/conversation');

exports.sendTextInput = function (text, name) {
    return new Promise(async(res, rej) => {
        try {
            const db = await low(adapter);
            const convo = await db.get('conversation').value();
            const users = await db.get('users').value();

            let nameToUse;
            convo.textQuery = text;

            if(users.length > 0) {
                if(!name) nameToUse = users[0].name;
                else nameToUse = name;
                const conversation = new Conversation(global.assistants[nameToUse], convo);
                res(conversation)
            }
            res()
        } catch (e) {
            rej(e)
        }
    })
};