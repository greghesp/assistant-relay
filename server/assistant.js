const GoogleAssistant = require('google-assistant');
const FileWriter = require('wav').FileWriter;
const terminalImage = require('terminal-image');
const path = require('path');
const fs = require('fs');

let returnAudio;
let gConfig;

/**
 *
 * @type {FileWriter|*}
 */
const playbackWriter = new FileWriter('server/playback.wav', {
    sampleRate: 24000,
    channels: 1
});


/**
 *
 * @type {string[]}
 */
const inputFiles = [
    `${path.resolve(__dirname, 'broadcast.wav')}`,
    `${path.resolve(__dirname, 'response.wav')}`
];

/**
 *
 * @type {{outputFileStream: (function(): (FileWriter|*)), startConversation: (function(*=, *=): Promise<any>), setupAssistant: (function(): Promise<any>), joinAudio: module.exports.joinAudio, sendAudioInput: (function(): Promise<any>), setUser: (function(*=): *), sendTextInput: (function(*, *=, *=): Promise<any>)}}
 */
const self = module.exports = {

    setupAssistant: async function () {
        let users = [];

        Object.entries(global.config.users).forEach(user => {
            const userName = user[0];
            const auth = user[1];
            users.push(userName);
            global.config.assistants[userName] = new GoogleAssistant(auth);
            let assistant = global.config.assistants[userName];
            assistant.on('ready', () => {
                console.info('I am ready');
            });
            assistant.on('error', (e) => {
                console.log(`❌ Assistant Error when activating user ${userName}. Trying next user ❌ \n`, e);
                throw e;
            });
        });
        console.log(await terminalImage.file('./icon.png'));
        console.log(`Assistant Relay is now setup and running for${users.map(u => ` ${u}`)} \n`);
        console.log(`You can now visit ${global.config.baseUrl} in a browser, or send POST requests to it`);

        if (!global.config.muteStartup) {
            await self.sendTextInput('broadcast Assistant Relay is now setup and running');
        }
    },

    /**
     *
     * @param text
     * @param n
     * @param converse
     * @returns {Promise<*>}
     */
    sendTextInput: function (text, n, converse) {
        return new Promise((resolve, reject) => {
            console.log(`Received command: ${text} \n`);
            if (converse) returnAudio = true;
            // set the conversation query to text
            global.config.conversation.textQuery = text;
            const assistant = self.setUser(n);
            assistant.start(global.config.conversation, (conversation) => {
                self.startConversation(conversation)
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        });
    },

    /**
     *
     * @returns {Promise<*>}
     */
    sendAudioInput: function () {
        const assistant = self.setUser();
        return new Promise((resolve, reject) => {
            fs.readFile(`${path.resolve(__dirname, 'response.wav')}`, (err, file) => {
                if (err) console.log(err);
                assistant.start(global.config.conversation, (conversation) => {
                    return self.startConversation(conversation, file)
                        .then((data) => {
                            console.log(data);
                            resolve(data);
                        })
                        .catch((err) => {
                            console.log(err);
                            reject(err);
                        });
                });
            });

        });

    },

    /**
     *
     * @param conversation
     * @param file
     * @returns {Promise<*>}
     */
    startConversation: function (conversation, file) {
        let response = {};
        const fileStream = self.outputFileStream();
        return new Promise((resolve, reject) => {
            conversation.write(file);
            conversation
                .on('audio-data', data => {
                    fileStream.write(data);
                    // set a random parameter on audio url to prevent caching
                    response.audio = `http://${global.config.baseUrl}/audio?v=${Math.floor(Math.random() * 100)}`;
                })
                .on('response', async (text) => {
                    if (text) {
                        console.log(`Google Assistant: ${text} \n`);
                        response.response = text;
                        if (returnAudio) {
                            await self.sendTextInput(`broadcast ${text}`, undefined, gConfig);
                            returnAudio = false;
                        }
                    }
                })
                .on('end-of-utterance', () => {
                    console.log('Done speaking');
                })
                .on('transcription', (data) => {
                    response.transcript = JSON.stringify(data);
                    console.log(JSON.stringify(data));
                })
                .on('volume-percent', percent => {
                    console.log(`Volume has been set to ${percent} \n`);
                    response.volume = `New Volume Percent is ${percent}`;
                })
                .on('device-action', action => {
                    console.log(`Device Action: ${action} \n`);
                    response.action = `Device Action is ${action}`;
                })
                .on('ended', (error, continueConversation) => {
                    if (error) {
                        console.log('Conversation Ended Error:', error);
                        response.success = false;
                        reject(response);
                    } else if (continueConversation) {
                        response.success = true;
                        console.log('Continue the conversation... somehow \n');
                        conversation.end();
                        resolve();
                    } else {
                        response.success = true;
                        console.log('Conversation Complete \n');
                        fileStream.end();
                        //self.joinAudio();
                        conversation.end();

                        resolve(response);
                    }
                })
                .on('error', (error) => {
                    console.log(`Something went wrong: ${error}`);
                    response.success = false;
                    response.error = error;
                    reject(response);
                });
        });
    },

    /**
     *
     * @param userName
     * @returns {GoogleAssistant.Assistant}
     */
    setUser: function (userName) {
        // set default assistant to first user
        let assistant = global.config.assistants[userName];

        // check to see if user passed exists
        if (userName) {
            const users = Object.keys(global.config.users);
            if (!users.includes(userName.toLowerCase())) {
                console.log(`User not found, using ${Object.keys(global.config.assistants)[0]} \n`);
            } else {
                userName = userName.toLowerCase();
                console.log(`User specified was ${userName} \n`);
            }
        } else {
            const firstAvailable = Object.keys(global.config.assistants)[0];
            console.log(`No user specified, using ${firstAvailable} \n`);
            assistant = global.config.assistants[firstAvailable];
        }

        return assistant;
    },

    /**
     *
     * @returns {FileWriter|*}
     */
    outputFileStream: function () {
        return new FileWriter(path.resolve(__dirname, 'response.wav'), {
            sampleRate: global.config.conversation.audio.sampleRateOut,
            channels: 1
        });
    },

    /**
     *
     */
    joinAudio: function () {
        if (!inputFiles.length) {
            playbackWriter.end('done');
            return;
        }

        const currentFile = inputFiles.shift();
        let stream = fs.createReadStream(currentFile);
        stream.pipe(playbackWriter, {end: false});
        stream.on('end', () => {
            console.log(currentFile, 'appended');
            self.joinAudio();
        });

    }
};
