const low = require('lowdb');
const chalk = require('chalk');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const bonjour = require('bonjour')();
const ip = require('ip');
const axios = require('axios');
const { spawn } = require('child_process');

const adapter = new FileSync('./bin/config.json');
const {setCredentials} = require('../helpers/auth');
const {sendTextInput} = require('../helpers/assistant.js');
const version = require('../bin/version.json');

const FileWriter = require('wav').FileWriter;
const moment = require('moment');
const fs = require("fs");

const Assistant = require('google-assistant/components/assistant');

exports.initializeServer = function (text) {
    return new Promise(async(res, rej) => {
        try {
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
                releaseChannel: 'stable',
                castEnabled: false,
                pipCommand: 'pip3'
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

            const service = bonjour.publish({
                name: 'Assistant Relay',
                host: 'ar.local',
                type: 'http',
                port: port
            });

            console.log(chalk.green("Assistant Relay Server Initialized"));
            console.log(chalk.green.bold(`Visit http://${ip.address()}:${port} or http://${service.host}:${port} in a browser to configure`));
            if(updateAvail) console.log(chalk.cyan(`An update is available. Please visit https://github.com/greghesp/assistant-relay/releases`));

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
        console.log("Checking for update...");
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

exports.registerDevice = function() {
    return new Promise(async(res, rej) => {
        try {
            const db = await low(adapter);
            const users = await db.get('users').value();
            const projectid = users[0].secret.installed.project_id;
            const accesstoken = users[0].tokens.access_token;
            const modelid = `${projectid}-assistant-relay`;
            const deviceid = "my_assistant_relay";

            const convo = db.get('conversation').value();

            if (convo.deviceModelId !== null && convo.deviceId !== null){
                await axios({
                    method: 'post',
                    url: `https://embeddedassistant.googleapis.com/v1alpha2/projects/${projectid}/deviceModels/`,
                    headers: {
                        'Authorization': `Bearer ${accesstoken}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "project_id": projectid,
                        "device_model_id": `${projectid}-assistant-relay`,
                        "manifest": {
                            "manufacturer": "Greg Hesp",
                            "product_name": "Assistant Relay",
                            "device_description": "Assistant Relay device"
                        },
                        "device_type": "action.devices.types.SPEAKER"
                    }
                });
                await axios({
                    method: 'post',
                    url: `https://embeddedassistant.googleapis.com/v1alpha2/projects/${projectid}/devices/`,
                    headers: {
                        'Authorization': `Bearer ${accesstoken}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "id": deviceid,
                        "model_id": modelid,
                        "nickname": "My Assistant Relay",
                        "client_type": "SDK_SERVICE"
                    }
                });
                db.get('conversation').push({ deviceModelId: modelid, deviceId: deviceid}).write();
                console.log("Device registered - Please assign Assistant Relay to a home in the Google Home app");

                return res();
            } else {
                console.log("Device registration already complete");
                return res();
            }
        } catch (e) {
            console.error(e);
            return rej();
        }
    })
}

exports.removeDevice = function() {
    return new Promise(async(res, rej) => {
        try {
            const db = await low(adapter);
            const users = await db.get('users').value();
            const projectid = users[0].secret.installed.project_id;
            const accesstoken = users[0].tokens.access_token;
            const modelid = `${projectid}-assistant-relay`;
            const deviceid = "my_assistant_relay";

            const convo = db.get('conversation').value();

            if (convo.deviceModelId !== null && convo.deviceId !== null){
                await axios({
                    method: 'delete',
                    url: `https://embeddedassistant.googleapis.com/v1alpha2/projects/${projectid}/deviceModels/${modelid}`,
                    headers: {
                        'Authorization': `Bearer ${accesstoken}`,
                        'Content-Type': 'application/json'
                    }
                });
                await db.get('conversation').remove({ deviceModelId: modelid, deviceId: deviceid}).write();
                console.log("Device deleted");
                return res();
            } else {
                console.log("Device deletion already complete");
                return res();
            }
        } catch (e) {
            console.error(e);
            return rej(e);
        }
    })
}


