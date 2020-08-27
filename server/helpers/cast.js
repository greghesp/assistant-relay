const s = require('shelljs');
const { castLogger } = require('../helpers/logger');

exports.isInstalled = function () {
  return new Promise((res, rej) => {
    if (!s.which('catt')) return rej('CATT is not installed');
    return res();
  });
};

exports.search = async function () {
  return new Promise((res, rej) => {
    const scan = s.exec('catt scan --json-output', { silent: true });
    if (scan.code !== 0) return rej('CATT scan failed');
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

exports.command = function (command) {
  return new Promise((res, rej) => {
    if (command.startsWith('catt ')) command = command.slice(5);
    command = s.exec(`catt ${command}`, { silent: true }, (code, stdout, stderr) => {
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
