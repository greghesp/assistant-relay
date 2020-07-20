const express = require('express');
const next = require('next');
const { parse } = require('url');
const chalk = require('chalk');
const ip = require('ip');
const bonjour = require('bonjour')();
const jwt = require('jsonwebtoken');

const { configuration } = require('./helpers/db');
const { logger } = require('./helpers/logger');

const config = configuration();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { initializeServer } = require('./helpers/server.js');

// Create global variable to store assistants in memory
global.assistants = {};

app.prepare().then(async () => {
  const server = express();
  const port = config.get('port').value();

  await initializeServer();

  server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });

  //Handle all get requests in Next
  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);

    // Validate JWT for routes that start with /api/server
    if (parsedUrl.path.startsWith('/api/server') && config.get('passwordLock').value()) {
      try {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.jwtSecret);
      } catch (err) {
        logger.log('error', `JWT Validation failed: ${err.message}`, { service: 'server' });

        console.log(err);
        return res.status(401).json({ msg: err.message });
      }

      return handle(req, res, parsedUrl);
    }

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
