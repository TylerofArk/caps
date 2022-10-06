'use strict';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3002/caps');

socket.emit('JOIN', 'mailing');

function customerOrder () {
  const payload = {text: 'New Customer Order'};
  socket.emit('NEW CUSTOMER ORDER', payload);
}

setInterval(() => {
  console.log('-------- New Order Begins -------');
  customerOrder();
}, 4000);



