const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const low = require('lowdb');

exports.database = function () {
  if (process.env.databasePath) return low(new FileSync(process.env.databasePath));
  return low(new FileSync(path.resolve('./server/bin/db.json')));
};

exports.configuration = function () {
  if (process.env.configurationPath) return low(new FileSync(process.env.configurationPath));
  return low(new FileSync(path.resolve('./server/bin/config.json')));
};
