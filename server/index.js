'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

const server = new Server(PORT);

const caps = server.of('/caps');

server.on('connection', (socket) => {
  console.log('Socket connected to Event Server!', socket.id);

  socket.on('EVENT', (payload) => {
    console.log('Server EVENT', payload);
    socket.broadcast.emit('EVENT', payload);
  });

  socket.on('RECEIVED', (payload) => {
    console.log('Server Received Event', payload);
    socket.broadcast.emit('RECEIVED', payload);
  });
});

caps.on('connection', (socket) => {
  console.log('Socket connected to CAPS namespace!', socket.id);

  socket.on('JOIN', (room) => {
    console.log(`You have joined the ${room} room`);
  });

  socket.on('PICKUP', (payload) => {
    logEvent('PICKUP', payload);
    caps.emit('PICKUP', payload);
  });
});

function logEvent(event, payload){
  const date = new Date();
  const time = date.toTimeString();
  console.log('EVENT2', {event, time, payload});
}
