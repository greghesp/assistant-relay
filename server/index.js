const express = require('express');
const next = require('next');
const { parse } = require('url');
const chalk = require('chalk');
const ip = require('ip');
const bonjour = require('bonjour')();
const jwt = require('jsonwebtoken');

const { configuration } = require('./helpers/db');
const { logger } = require('./helpers/logger');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { initializeServer, validateJWT, validateAPIKey } = require('./helpers/server.js');
const { updater } = require('./helpers/updater');

// Create global variable to store assistants in memory
global.assistants = {};

app.prepare().then(async () => {
  const server = express();
  await initializeServer();
  //updater();

  // Get config after server initialized
  const config = configuration();
  const port = config.get('port').value();

  server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });

  server.all('/api/server/*', (req, res) => {
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

  server.all('/api/assistant', async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const valid = await validateAPIKey(parsedUrl, req);

    if (valid) {
      return handle(req, res, parsedUrl);
    } else {
      logger.log('error', `Invalid API Key provided`, { service: 'server', func: 'index' });
      return res.status(401).json({ msg: 'Invalid API Key provided' });
    }
  });

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });

  server.listen(port, err => {
    if (err) throw err;

    // Publish a bonjour service
    const service = bonjour.publish({
      name: 'Assistant Relay',
      host: 'ar.local',
      type: 'http',
      port: port,
    });

    console.log(
      chalk.green.bold(
        `Visit http://${ip.address()}:${port} or http://${
          service.host
        }:${port} in a browser to configure`,
      ),
    );
  });
});
