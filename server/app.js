const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes.js');
const dashboard = require('./dashboard.js');
const audio = require('./audio.js');

const configureUsers = require('./configuration').configureUsers;
const setupAssistant = require('./assistant').setupAssistant;

const app = express();
app.use(bodyParser.json());

app.use(function (req, res, next) {
    const currentDate = new Date();
    const now = currentDate.getHours();
    if (global.config.quietHours !== undefined && (global.config.quietHours.start <= now || global.config.quietHours.end >= now)) {
        console.log('Got a command during quiet hours (start: ' + global.config.quietHours.start + ', end: ' + global.config.quietHours.end + ' now: ' + now + '). Ignoring.');
        res.status(420).send('Dude, chill, it\'s quiet time!');
        return;
    }
    next();
});

app.use('/', routes);
app.use('/dashboard', dashboard);
app.use('/audio', audio);

// Configure users on first run
configureUsers()
    .then((config) => {
        global.config = config;
        app.listen(global.config.port);
        return setupAssistant();
    })
    .catch((e) => {
        console.error(e);
    });


process.on('unhandledRejection', error => {
    // Will print "unhandledRejection err is not defined"
    console.error('unhandledRejection', error.message);
});

process.on('uncaughtException', function (err) {
    console.error(err);
})