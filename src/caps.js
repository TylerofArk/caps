'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./library/queue');
const messageQueue = new Queue();
const server = new Server(PORT);
const caps = server.of('/caps');


caps.on('connection', (socket) => {
  console.log('Socket connected to CAPS namespace!', socket.id);

  socket.onAny((event, payload) => {
    const date = new Date();
    const time = date.toTimeString();
    console.log('EVENT', {event, time, payload});
  });

  socket.on('JOIN', (room) => {
    socket.join(room);
    console.log(`You have joined the ${room} room`);
  });

  socket.on('PICKUP', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    socket.broadcast.emit('PICKUP', payload);
  });

  socket.on('IN-TRANSIT', (payload) => socket.broadcast.emit('IN-TRANSIT', payload));

  socket.on('DELIVERED', (payload) => socket.broadcast.emit('DELIVERED', payload));

  socket.on('RECEIEVED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('No queue created, messaging error');
    }
    let deleteMessage = currentQueue.remove(payload.messageId);
  });

  socket.on('GETALL', () => {
    console.log(`getting all messages for ${payload.queueId}`);

    let currentQueue = messageQueue.read(payload.queueId);
    if (currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(messageId => {
        socket.emit('DELIVERED', currentQueue.read(messageId));
      });
    }
  });
});
