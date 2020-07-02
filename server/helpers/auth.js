"use strict";
const { OAuth2Client } = require("google-auth-library");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./bin/config.json");



