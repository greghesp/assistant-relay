// Create global variable to store assistants in memory
global.assistants = {};
global.sockets = [];
global.devices = [];

const app = require('express')();
//const server = app;
//const server = require('http').createServer(app);
//global.io = require('socket.io')(server);
const next = require('next');

const { parse } = require('url');
const chalk = require('chalk');
const ip = require('ip');
const bonjour = require('bonjour')();

const { configuration } = require('./helpers/db');
const { logger, castLogger } = require('./helpers/logger');
const { startSearch } = require('./helpers/cast-api');

const config = configuration();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const { initializeServer, validateJWT, validateAPIKey } = require('./helpers/server.js');

// io.on('connection', socket => {
//   global.sockets.push() = socket;
//   console.log('Connection');
//
//   socket.on('streamCastLogs', () => {
//     castLogger.stream({ start: -1 }).on('log', function (log) {
//       global.socket.emit('castLog', { message: log.message, timestamp: log.timestamp });
//     });
//   });
// });

nextApp
  .prepare()
  .then(async () => {
    const port = config.get('port').value();

    await initializeServer();
    startSearch();

    app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization');
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      next();
    });

    app.all('/api/server/*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const passwordLock = config.get('passwordLock').value();

      // TODO: Remove before launch
      return handle(req, res, parsedUrl);

      // If passwordLock is true && no or invalid JWT, throw 401.  Else, let through
      if ((passwordLock && validateJWT(req)) || !passwordLock) {
        return handle(req, res, parsedUrl);
      } else {
        logger.log('error', `JWT Validation failed`, { service: 'server', func: 'index' });
        return res.status(401).json({ msg: 'JWT Validation failed' });
      }
    });

    app.all('/api/assistant', async (req, res) => {
      const parsedUrl = parse(req.url, true);
      const valid = await validateAPIKey(parsedUrl, req);

      if (valid) {
        return handle(req, res, parsedUrl);
      } else {
        logger.log('error', `Invalid API Key provided`, { service: 'server', func: 'index' });
        return res.status(401).json({ msg: 'Invalid API Key provided' });
      }
    });

    app.all('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      return handle(req, res, parsedUrl);
    });

    app.listen(port, err => {
      if (err) throw err;

      // Publish a bonjour service
      // const service = bonjour.publish({
      //   name: 'Assistant Relay',
      //   host: 'ar.local',
      //   type: 'http',
      //   port: port,
      // });

      console.log('Started');
      console.log(
        chalk.green.bold(`Visit http://${ip.address()}:${port} in a browser to configure`),
      );
    });
  })
  .catch(e => {
    console.log`ERROR: ${e}`;
  });
