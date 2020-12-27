const AutoUpdater = require('auto-updater');
const { logger } = require('../helpers/logger');
const s = require('shelljs');

const autoupdater = new AutoUpdater({
  pathToJson: '',
  autoupdate: true,
  checkgit: true,
  jsonhost: 'raw.githubusercontent.com',
  contenthost: 'https://github.com/greghesp/assistant-relay/archive/v4.zip',
  progressDebounce: 0,
  devmode: true,
});

autoupdater.on('git-clone', function () {
  s.exec(`git pull`, { silent: true }, (code, stdout, stderr) => {
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
  logger.log('info', `You have the latest version: ${v}`, {
    service: 'server',
    func: 'updater',
  });
});

autoupdater.on('check.out-dated', function (v_old, v) {
  logger.log('info', `Your version is outdated. ${v_old} of ${v}`, {
    service: 'server',
    func: 'updater',
  });
  autoupdater.fire('download-update'); // If autoupdate: false, you'll have to do this manually.
  // Maybe ask if the'd like to download the update.
});

autoupdater.on('update.downloaded', function () {
  logger.log('info', `Update downloaded and ready for install`, {
    service: 'server',
    func: 'updater',
  });
  autoupdater.fire('extract'); // If autoupdate: false, you'll have to do this manually.
});

autoupdater.on('update.not-installed', function () {
  logger.log('info', `The was already downloaded! It's read for install`, {
    service: 'server',
    func: 'updater',
  });
  autoupdater.fire('extract'); // If autoupdate: false, you'll have to do this manually.
});

autoupdater.on('update.extracted', function () {
  logger.log('info', `Update successful`, {
    service: 'server',
    func: 'updater',
  });
  console.warn('RESTART THE APP!');
});

autoupdater.on('download.start', function (name) {
  logger.log('info', `Starting download: ${name}`, {
    service: 'server',
    func: 'updater',
  });
});

autoupdater.on('download.progress', function (name, perc) {
  process.stdout.write('Downloading ' + perc + '% \033[0G');
});

autoupdater.on('download.end', function (name) {
  logger.log('info', `Downloaded ${name}`, {
    service: 'server',
    func: 'updater',
  });
});

autoupdater.on('download.error', function (err) {
  logger.log('error', `Download failed: ${err}`, {
    service: 'server',
    func: 'updater',
  });
});

autoupdater.on('end', function () {
  console.log('The app is ready to function');
});

autoupdater.on('error', function (name, e) {
  logger.log('error', `${name}: ${e}`, {
    service: 'server',
    func: 'updater',
  });
});

exports.updater = function () {
  logger.log('info', `Checking for updates...`, {
    service: 'server',
    func: 'updater',
  });
  autoupdater.fire('check');
};
