const s = require('shelljs');
const { castLogger, logger } = require('../helpers/logger');

exports.isInstalled = function () {
  return new Promise((res, rej) => {
    if (!s.which('catt')) {
      logger.log('error', 'CATT is not installed', {
        service: "server",
        func: 'cast - isInstalled',
      });
      return rej('CATT is not installed');
    }
    return res();
  });
};

exports.search = async function () {
  return new Promise((res, rej) => {
    const scan = s.exec('catt scan --json-output', { silent: true });
    if (scan.code !== 0) {
      logger.log('error', 'CATT scan failed', {
        service: "server",
        func: 'cast - search',
      });
      return rej('CATT scan failed');
    }
    const devices = JSON.parse(scan.stdout);
    const newDevices = {
      success: true,
      devices: [],
    };

    Object.entries(devices).forEach(([key, val]) => {
      newDevices.devices.push({
        name: key,
        address: val.model_name.includes('Group') ? '' : val.host,
        model: val.model_name,
        uuid: val.uuid,
      });
    });

    return res(newDevices);
  });
};

exports.command = function ({ command }) {
  return new Promise((res, rej) => {
    // Check if command already includes `catt`, if so, remove it
    if (command.toLowerCase().startsWith('catt ')) command = command.slice(5);

    logger.log('info', `Executing ${command}`, {
      service: "server",
      func: 'cast - command',
    });

    s.exec(`catt ${command}`, { silent: true }, (code, stdout, stderr) => {
      if (stdout) {
        const lines = stdout.split('\r\n');
        lines.forEach(l => {
          if (l.length > 0) {
            logger.log('info', `${l}`, {
              service: "server",
              func: 'cast - command',
            });
          }
        });
      }

      if (stderr) return rej(stderr);

      if (code === 0) return res();

    });
  });
};
