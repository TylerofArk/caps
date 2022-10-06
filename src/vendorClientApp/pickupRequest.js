'use strict';

const Chance = require('chance');
const chance = new Chance();

const joinRoom = require('./joinRoom');

function pickupRequest(socket) {
  console.log('----- Order Ready for Pickup -----');

  let payload = {
    store: `${chance.company()}`,
    orderId: `${chance.integer({ min: 100000, max: 999999})}`,
    customer: `${chance.first() + ' ' + chance.last()}`,
    address: `${chance.address()}`,
  };

  joinRoom(socket, payload);
  socket.emit('PICKUP', payload);
}

module.exports = pickupRequest;
