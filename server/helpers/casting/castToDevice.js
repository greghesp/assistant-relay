const cache = {};

class CastToDevice {
  constructor(name, device, url) {
    if (cache[name]) return cache[name];
    this.device = device;
    this.url = url;
  }

  _pauseResume() {
    device.getCurrentTime();
  }

  cast() {
    device.play(this.url, function (err) {
      if (err) this.emit('error', err);
      this.emit('success');
    });
  }
}
