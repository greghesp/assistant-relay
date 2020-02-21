const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const ip = require('ip');
const axios = require('axios');
const { spawn } = require('child_process');


const adapter = new FileSync('./bin/config.json');
const {setCredentials} = require('../helpers/auth');
const {sendTextInput} = require('../helpers/assistant.js');
const {install} = require('../helpers/cast.js');
const version = require('../bin/version.json');

const FileWriter = require('wav').FileWriter;
const moment = require('moment');
const fs = require("fs");

const Assistant = require('google-assistant/components/assistant');

exports.initializeServer = function (text) {
    return new Promise(async(res, rej) => {
        try {
            console.log("Installing dependencies for casting...");
            await install();

            const db = await low(adapter);
            await db.defaults({
                port: 3000,
                muteStartup: false,
                quietHours: {
                    enabled: false,
                    start: "22:00",
                    end: "08:00"
                },
                maxResponses: 5,
                conversation: {
                    audio: {
                        encodingIn: 'LINEAR16',
                        sampleRateIn: 16000,
                        encodingOut: 'LINEAR16',
                        sampleRateOut: 24000,
                    },
                    lang: 'en-US',
                    screen: {
                        isOn: false,
                    }
                },
                users: [],
                responses: [],
                releaseChannel: 'stable'
            }).write();
            const size = db.get('users').size().value();
            const users = db.get('users').value();
            const port = db.get('port').value();

            const muted = await exports.isStartupMuted();
            const updateAvail = await exports.isUpdateAvailable();
            const isQH = await exports.isQuietHour();
            const promises = [];

            if(size > 0 ) {
                users.forEach(user => {
                    promises.push(new Promise(async(resolve,rej) => {
                        const client = await setCredentials(user.name);
                        global.assistants[user.name] = new Assistant(client);
                        resolve();
                    }));
                });
                await Promise.all(promises);
            }
            if(!muted && !isQH) await sendTextInput(`broadcast Assistant Relay initialised`);

            console.log("Assistant Relay Server Initialized");
            console.log(`Visit http://${ip.address()}:${port} in a browser to configure`);
            if(updateAvail) console.log(`An update is available. Please visit https://github.com/greghesp/assistant-relay/releases`);
            return res();
        } catch (e) {
            rej(e)
        }
    })
};

exports.outputFileStream = function(conversation, fileName) {
    return new FileWriter(`bin/audio-responses/${fileName}.wav`, {
        sampleRate: conversation.audio.sampleRateOut,
        channels: 1
    });
};

exports.updateResponses = function(command, response, timestamp) {
    return new Promise(async(res, rej) => {
        const db = await low(adapter);
        const size = db.get('responses').size().value();
        const maxResponse = db.get('maxResponses').value();
        if(size >= maxResponse) {
            const results = db.get('responses').sortBy('timestamp').value();
            const timestamp = results[0].timestamp;
            fs.unlinkSync(path.resolve(__dirname, `../bin/audio-responses/${timestamp}.wav`));
            const entries = db.get('responses').sortBy('timestamp').drop(1).value();
            await db.set('responses', entries).write();
        }
        await db.get('responses').push({command, response, timestamp}).write();
        res();
    })
};

exports.isQuietHour = function() {
    return new Promise(async(res,rej) => {
        const db = await low(adapter);
        const quietHours = db.get('quietHours').value();

        if(!quietHours.enabled) return res(false);

        const start = moment(quietHours.start, "HH:mm");
        const until = moment(quietHours.end, "HH:mm");
        let diff  = moment.duration(until.diff(start)).asMinutes();

        if(diff < 0) until.add(1, 'days');
        return res(moment().isBetween(start, until));
    })
};

exports.isStartupMuted = function() {
    return new Promise(async(res, rej) => {
        const db = await low(adapter);
        const muteStartup = db.get('muteStartup').value();
        if (muteStartup) return res(true);
        return res(false);
    })
};

exports.isUpdateAvailable = function() {
    return new Promise(async(res, rej) => {
        const db = await low(adapter);
        const channel = await db.get('releaseChannel').value();
        let url = 'https://api.github.com/repos/greghesp/assistant-relay/releases/latest';

        if(channel === "beta") url = 'https://api.github.com/repos/greghesp/assistant-relay/releases';
        try {
            const response = await axios.get(url);

            if(channel === "stable") {
                if(response.data.tag_name !== version.version) {
                    return res(true)
                } else {
                    return res(false)
                }
            }

            if(response.data[0].tag_name !== version.version) {
                return res(true)
            } else {
                return res(false)
            }
        } catch(e) {
            console.error("Update check failed. You've probably been rate limited by GitHub");
            return res();
        }

    })
};

exports.updateDetails = function() {
    return new Promise(async(res, rej) => {
        const response = await axios.get('https://api.github.com/repos/greghesp/assistant-relay/releases/latest');
        const data = {
            title: response.data.name,
            link: response.data.assets[0].browser_download_url
        };
        return res(data);
    })
};

exports.updateServer = function() {
    const updater = (path.resolve(__dirname, '..') + "/bin/update.py");
    const u = spawn('py', [updater]);
    u.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
    });

    u.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`)
    });

    u.on('close', (code) => {
        process.exit();
    });

}