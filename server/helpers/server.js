const { OAuth2Client } = require('google-auth-library');
const { sendTextInput } = require('../helpers/assistant.js');
const { logger } = require('../helpers/logger');
const jwt = require('jsonwebtoken');
const packageFile = require('../../package.json');
const axios = require('axios');

const { database, configuration } = require('../helpers/db');

const Assistant = require('google-assistant/components/assistant');

exports.initializeServer = function () {
  return new Promise(async (res, rej) => {
    try {
      const db = database();
      const config = configuration();

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
              isOn: false,
            },
          },
          releaseChannel: 'stable',
          trackID: null,
          accessControl: false,
          passwordLock: true,
          password: 'assistant',
        })
        .write();
      await db
        .defaults({
          secret: {},
          users: [],
          responses: [],
          accessControl: [],
          broadcastCount: 0,
          commandCount: 0,
        })
        .write();

      const users = await db.get('users').value();
      const muteStartup = await db.get('muteStartup').value();
      const uid = config.get('trackID').value();

      // TODO: Check what audio/html files exist. Remove from db if not there.  HASS IO workaround

      logger.log('info', 'Initialised configuration and database', {
        service: 'server',
        func: 'initializeServer',
      });

      // If there is a saved UID, update the tracked version
      if (uid) await exports.updateTrackingVersion(uid);

      if (db.get('users').size().value() > 0) {
        const secret = await db.get('secret').value();
        users.forEach(user => {
          promises.push(
            new Promise(async (resolve, reject) => {
              const key = secret.installed;
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
      logger.log('info', 'Created Assistant instance', {
        service: 'server',
        func: 'initializeServer',
      });

      //  Announce Assistant Relay has started up if muteStartup is false, not inside quiet hours and not first load
      // if (!muteStartup && !isQH && !firstLoad) {
      //     await sendTextInput(`broadcast Assistant Relay initialised`);
      // }

      // const updateAvail = await exports.isUpdateAvailable();
      //if (updateAvail) console.log(chalk.cyan(`An update is available. Please visit https://github.com/greghesp/assistant-relay/releases`));
      logger.log('info', 'Assistant Relay is ready', {
        service: 'server',
        func: 'initializeServer',
      });

      return res();
    } catch (e) {
      rej(e);
    }
  });
};

exports.trackVersion = async function () {
  const config = configuration();
  const { data } = await axios({
    method: 'post',
    url: `${process.env.functions_base}/initialize`,
    data: {
      version: packageFile.version,
    },
  });
  await config.set('trackID', data.uid).write();
};

exports.removeTracking = async function () {
  const config = configuration();
  const uid = config.get('trackID').value();
  try {
    await axios({
      method: 'post',
      url: `${process.env.functions_base}/removeTracking`,
      data: {
        uid,
      },
    });
  } catch (e) {
    console.log(e);
  }
  await config.set('trackID', null).write();
};

exports.updateTrackingVersion = async function (uid) {
  const { data } = await axios({
    method: 'post',
    url: `${process.env.functions_base}/updateTrackingVersion`,
    data: {
      uid,
      version: packageFile.version,
    },
  });
  if (!data.success && data.code === 97) await exports.trackVersion();
  if (!data.success && data.code === 99) {
    logger.log('error', 'Updating Tracking Version Failed. Please report', {
      service: 'server',
      func: 'updateTrackingVersion',
    });
  }
};

exports.validateJWT = function (req) {
  const token = req.headers.authorization;
  if (!token || typeof token === 'undefined') return false;
  return jwt.verify(token, process.env.jwtSecret, function (err, decoded) {
    if (!err) return true;
    return false;
  });
};

exports.validateAPIKey = async function (parsedURL, req) {
  const db = database();
  const apiKey = req.headers?.authorization || parsedURL.query?.authorization;
  const validKeys = await db.get('accessControl').value();

  // If no API keys, let access through
  if (validKeys.length === 0) return true;
  // If API keys, check its set and that the provided key is included
  return !!(apiKey && validKeys.includes(apiKey));
};
