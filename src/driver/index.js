'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

const handlePickup = require('./handlePickup')(socket);

// socket.emit('GETALL');

socket.on('PICKUP', handlePickup);
