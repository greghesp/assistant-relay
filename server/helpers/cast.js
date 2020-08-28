const s = require('shelljs');
const { castLogger } = require('../helpers/logger');

exports.isInstalled = function () {
  return new Promise((res, rej) => {
    if (!s.which('catt')) return rej('CATT is not installed');
    return res();
  });
};

exports.command = function ({ command }) {
  return new Promise((res, rej) => {
    let status;
    // Check if command already includes `catt`, if so, remove it
    if (command.startsWith('catt ')) command = command.slice(5);

    s.exec(`catt ${command}`, { silent: true }, (code, stdout, stderr) => {
      if (stdout) {
        const lines = stdout.split('\r\n');
        lines.forEach(l => {
          if (l.length > 0) castLogger.log('info', l);
        });
      }
      if (stderr) castLogger.log('error', stderr);
      if (code === 0) return res();
      return rej();
    });
  });
};
