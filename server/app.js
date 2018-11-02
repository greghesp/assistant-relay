const GoogleAssistant = require('google-assistant');
const express = require('express');
const bodyParser = require('body-parser');
const FileWriter = require('wav').FileWriter;

const startConversation = require('./assistant.js')
const routes = require('./routes.js');
const dashboard = require('./dashboard.js');
const audio = require('./audio.js');

const configureUsers = require('./configuration').configureUsers;
const setupConfigVar = require('./configuration').setupConfigVar;
const setupAssistant = require('./assistant').setupAssistant;
const sendTextInput = require('./assistant').sendTextInput;

const HOURS = 24;

const app = express();
app.use(bodyParser.json());

app.use( function( req, res, next ) {
	if (global.config.quietHours) {
		const d = new Date();
		let now = d.getHours();
		let { start, end } = global.config.quietHours;
		end += (start > end) ? HOURS : 0;
		now += (start > now) ? HOURS : 0;
		if (start <= now && end > now) {
			console.log(`Got a command during quiet hours (start: ${global.config.quietHours.start}, end: ${global.config.quietHours.end}, now: ${now}). Ignoring.`);
			res.status(420).send("Dude, chill, it's quiet time!");
			return;
		}
	}
	next();
});

app.use('/', routes);
app.use('/dashboard', dashboard)
app.use('/audio', audio)

// Configure users on first run
configureUsers()
.then((config) => {
  global.config = config;
  app.listen(global.config.port);
  return setupAssistant()
})
.catch((e) => {
  console.log(e)
})
