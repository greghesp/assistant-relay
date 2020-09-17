import cast from '../../src/pages/api/cast/cast';

const ChromecastAPI = require('chromecast-api');
const { logger } = require('../helpers/logger');

const client = new ChromecastAPI();

// client.on('device', function (device) {
//   global.devices.push({ name: device.friendlyName, device: device });
//
//   logger.log('info', `Found Cast device: ${device.friendlyName}`, {
//     service: 'server',
//     func: 'startSearch',
//   });
//
//   // if (global.socket) {
//   //   global.socket.emit('deviceFound', { name: device.friendlyName, device: device });
//   // }
// });

exports.startSearch = function () {
  logger.log('info', `Clearing cached cast devices and starting new search`, {
    service: 'server',
    func: 'startSearch',
  });

  global.devices = [];
  client.update();
};

exports.cast = function ({ device, pauseResume, url }) {
  const castDevice = global.devices.find(e => e.name === device);
  let currentTime;

  const mediaURL =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';

  if (pauseResume) {
    currentTime = castDevice.device.getCurrentTime(cb => cb);
    console.log(currentTime);
  }

  castDevice.device.play(mediaURL, function (err) {
    if (err) {
      logger.log('error', err, {
        service: 'server',
        func: 'cast',
      });
    } else {
      logger.log('info', `Casting media to ${device}`, {
        service: 'server',
        func: 'cast',
      });
    }
  });

  castDevice.device.on('finished', cb => {
    console.log('finished');
  });

  castDevice.device.on('status', status => {
    console.log(status);
  });
};
