const express = require('express');
const next = require('next');
const { parse } = require('url');
const path = require('path');
const low = require('lowdb');
const chalk = require('chalk');
const ip = require('ip');
const bonjour = require('bonjour')();
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const FileSync = require('lowdb/adapters/FileSync');
const configAdapter = new FileSync(path.resolve(__dirname, '../server/bin/config.json'));

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { initializeServer } = require('./helpers/server.js');

// Create global variable to store assistants in memory
global.assistants = {};

app.prepare().then(async () => {
  const db = await low(configAdapter);

  const server = express();
  const port = db.get('port').value();

  await initializeServer();

  passport.serializeUser(function (user, done) {
    //In serialize user you decide what to store in the session. Here I'm storing the user id only.
    done(null, '');
  });

  passport.deserializeUser(function (id, done) {
    //Here you retrieve all the info of the user from the session storage using the user id stored in the session earlier using serialize user.
    done(null, '');
  });

  passport.use(
    new LocalStrategy({}, function (username, password, done) {
      console.log(username, password);
      done();
    }),
  );

  server.use(passport.initialize());
  server.use(passport.session());

  server.all('/api/server/login', passport.authenticate('local'), function (req, res, next) {
    const parsedUrl = parse(req.url, true);
    return next(handle(req, res, parsedUrl));
  });

  //Handle all get requests in Next
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
