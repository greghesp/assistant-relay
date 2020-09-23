const s = require('shelljs');

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
