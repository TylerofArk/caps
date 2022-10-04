'use strict';

const eventPool = require('./eventPool');

const vendorHandler = require('./vendor');
const driverHandler = require('./vendor');
const Chance = require('chance');

const chance = new Chance();

eventPool.on('PICKUP', driverHandler);
eventPool.on('IN TRANSIT', vendorHandler);
eventPool.on('DELIVERY', driverHandler);

setInterval(() => {
  const order = {
    store: chance.company(),
    orderID: chance.guid({version: 5}),
    name: chance.name(),
    address: chance.address(),
  };

  console.log('---------------NEW ORDER-------------------');
  eventPool.emit('PICKUP', {order});
  eventPool.emit('IN TRANSIT', {order});
  eventPool.emit('DELIVERY', {order});
}, 5000);


