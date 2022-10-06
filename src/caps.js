'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./library/queue');

const server = new Server(PORT);
const caps = server.of('/caps');
const messageQueue = new Queue();
const messages = server.of('/messages');

caps.on('connection', (socket) => {
  console.log('Socket connected to CAPS namespace!', socket.id);

  socket.onAny((event, payload) => {
    const date = new Date();
    const time = date.toTimeString();
    console.log('EVENT', {event, time, payload});
  });

  socket.on('JOIN', (room) => {
    console.log(`You have joined the ${room} room`);
    socket.join(room);
  });

  socket.on('PICKUP', (payload) => {
    socket.broadcast.emit('PICKUP', payload);
  });

  socket.on('IN-TRANSIT', (payload) => {
    socket.broadcast.emit('IN-TRANSIT', payload);
  });

  socket.on('DELIVERED', (payload) => {
    socket.broadcast.emit('DELIVERED', payload);
  });
});
