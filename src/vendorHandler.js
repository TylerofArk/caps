'use strict';

let eventPool = require('./eventPool');
const Chance = require('chance');
const chance = new Chance();

eventPool.on('NEW CUSTOMER ORDER', initiateOrder);
eventPool.on('DELIVERED', confirmOrder);

function initiateOrder(payload)  {
  setTimeout(() => {

    console.log('VENDOR HERE', payload);
    let orderPayload = {
      store:chance.company(),
      orderId: chance.integer({ min: 100000, max: 999999}),
      customer: chance.first() + ' ' + chance.last(),
      address: chance.address(),
    };

    eventPool.emit('PICKUP', orderPayload);

  }, 1000);
}

function confirmOrder(payload) {
  setTimeout(() => {
    console.log('Thank you, ', payload.customer);
  }, 500);
}

function customerOrder () {
  const payload = {text: 'New Customer Order'};
  eventPool.emit('NEW CUSTOMER ORDER', payload);
}

setInterval(() => {
  console.log('-------- New Order Begins -------');
  customerOrder();
}, 4000);

module.exports = { initiateOrder, confirmOrder };
