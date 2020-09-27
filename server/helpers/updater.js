const AutoUpdater = require('auto-updater');
const { logger } = require('../helpers/logger');
const s = require('shelljs');

const autoupdater = new AutoUpdater({
  pathToJson: '',
  autoupdate: false,
  checkgit: true,
  jsonhost: 'raw.githubusercontent.com',
  contenthost: 'codeload.github.com',
  progressDebounce: 0,
  devmode: true,
});

autoupdater.on('git-clone', function () {
  s.exec(`git pull`, (code, stdout, stderr) => {
    if (stdout) {
      console.info('Updating Assistant Relay using git pull');
      logger.log('info', 'Updating Assistant Relay using git pull', {
        service: 'server',
        func: 'updater',
      });
    }

    if (stderr) {
      console.error(`Git Pull failed: ${stderr}`);
      logger.log('error', `Git Pull failed: ${stderr}`, {
        service: 'server',
        func: 'updater',
      });
    }

    if (code === 0) {
      console.error(`Git Pull Complete`);
      logger.log('info', `Git Pull Complete`, {
        service: 'server',
        func: 'updater',
      });
    }
  });
});

autoupdater.on('check.up-to-date', function (v) {
  console.info('You have the latest version: ' + v);
});

autoupdater.on('check.out-dated', function (v_old, v) {
  console.warn('Your version is outdated. ' + v_old + ' of ' + v);
  autoupdater.fire('download-update'); // If autoupdate: false, you'll have to do this manually.
  // Maybe ask if the'd like to download the update.
});

autoupdater.on('update.downloaded', function () {
  console.log('Update downloaded and ready for install');
  autoupdater.fire('extract'); // If autoupdate: false, you'll have to do this manually.
});

autoupdater.on('update.not-installed', function () {
  console.log("The Update was already in your folder! It's read for install");
  autoupdater.fire('extract'); // If autoupdate: false, you'll have to do this manually.
});

autoupdater.on('update.extracted', function () {
  console.log('Update extracted successfully!');
  console.warn('RESTART THE APP!');
});

autoupdater.on('download.start', function (name) {
  console.log('Starting downloading: ' + name);
});

autoupdater.on('download.progress', function (name, perc) {
  process.stdout.write('Downloading ' + perc + '% \033[0G');
});

autoupdater.on('download.end', function (name) {
  console.log('Downloaded ' + name);
});

autoupdater.on('download.error', function (err) {
  console.error('Error when downloading: ' + err);
});

autoupdater.on('end', function () {
  console.log('The app is ready to function');
});

autoupdater.on('error', function (name, e) {
  console.error(name, e);
});

exports.updater = function () {
  autoupdater.fire('check');
};
