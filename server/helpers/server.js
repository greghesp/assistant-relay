const { OAuth2Client } = require('google-auth-library');
const { sendTextInput } = require('../helpers/assistant.js');
const { logger } = require('../helpers/logger');
const packageFile = require('../../package.json');

const { database, configuration } = require('../helpers/db');
const config = configuration();
const db = database();

const Assistant = require('google-assistant/components/assistant');

exports.initializeServer = function () {
  return new Promise(async (res, rej) => {
    try {
      const users = await db.get('users').value();
      const muteStartup = await db.get('muteStartup').value();
      //const isQH = await exports.isQuietHour();
      const promises = [];
      let firstLoad = true;

      // Generate default databases
      await config
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
          accessControl: false,
          passwordLock: true,
          password: null,
        })
        .write();
      await db
        .defaults({
          users: [],
          responses: [],
          accessControl: [],
          broadcastCount: 0,
          commandCount: 0,
        })
        .write();

      // TODO: Check what audio/html files exist. Remove from db if not there.  HASS IO workaround

      logger.log('info', 'Initialised configuration and database', { service: 'server' });

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
      logger.log('info', 'Created Assistant instance', { service: 'server' });

      //  Announce Assistant Relay has started up if muteStartup is false, not inside quiet hours and not first load
      // if (!muteStartup && !isQH && !firstLoad) {
      //     await sendTextInput(`broadcast Assistant Relay initialised`);
      // }

      // const updateAvail = await exports.isUpdateAvailable();
      //if (updateAvail) console.log(chalk.cyan(`An update is available. Please visit https://github.com/greghesp/assistant-relay/releases`));
      logger.log('info', 'Assistant Relay is ready', { service: 'server' });

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