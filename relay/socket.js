const io = require('socket.io');

const socket = io();

io.on('connection', (client) => {
  // here you can start emitting events to the client
});

module.exports = socket;
