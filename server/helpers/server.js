const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');

const configAdapter = new FileSync(path.resolve(__dirname, '../bin/config.json'));
const dbAdapter = new FileSync(path.resolve(__dirname, '../bin/db.json'));
const { sendTextInput } = require('../helpers/assistant.js');
const packageFile = require('../../package.json');

const Assistant = require('google-assistant/components/assistant');

exports.initializeServer = function () {
  return new Promise(async (res, rej) => {
    try {
      const configDb = await low(configAdapter);
      const db = await low(dbAdapter);

      const users = db.get('users').value();
      const muteStartup = db.get('muteStartup').value();
      const isQH = await exports.isQuietHour();
      const promises = [];
      let firstLoad = true;

      // Generate default databases
      await configDb
        .defaults({
          port: 3000,
          muteStartup: false,
          quietHours: {
            enabled: false,
            start: '22:00',
            end: '08:00',
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
              isOn: true,
            },
          },
          releaseChannel: 'stable',
          castEnabled: false,
          track: false,
          pipCommand: 'pip3',
        })
        .write();
      await db
        .defaults({
          users: [],
          responses: [],
        })
        .write();

      if (db.get('users').size().value() > 0) {
        users.forEach(user => {
          promises.push(
            new Promise(async (resolve, reject) => {
              const key = user.secret.installed;
              const oauthClient = new OAuth2Client(
                key.client_id,
                key.client_secret,
                key.redirect_uris[0],
              );
              oauthClient.setCredentials(user.tokens);

              global.assistants[user.name] = new Assistant(oauthClient);
              resolve();
            }),
          );
        });
        firstLoad = false;
      }

      // Create Assistant Instances in memory
      await Promise.all(promises);

      //  Announce Assistant Relay has started up if muteStartup is false, not inside quiet hours and not first load
      if (!muteStartup && !isQH && !firstLoad)
        await sendTextInput(`broadcast Assistant Relay initialised`);

      // const updateAvail = await exports.isUpdateAvailable();
      //if (updateAvail) console.log(chalk.cyan(`An update is available. Please visit https://github.com/greghesp/assistant-relay/releases`));

      return res();
    } catch (e) {
      rej(e);
    }
  });
};

exports.trackVersion = function () {
  //ToDo: Send version info
  console.log(packageFile.version);
};
