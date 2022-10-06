'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

const pickupRequest = require('./pickupRequest');

socket.on('DELIVERED', (payload) => {
  console.log(`Thank you for delivering ${payload.orderID}`);
  socket.disconnect();
});

setInterval(() => {
  pickupRequest(socket);
}, 5000);


