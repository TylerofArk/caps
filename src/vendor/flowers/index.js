'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');
const Chance = require('chance');
const chance = new Chance();
const MessageClient = require('../lib/messageClient');
const flowerVendor = new MessageClient('1-800-flowers')

// const pickupRequest = require('../widgets/pickupRequest');

flowerVendor.publish('GETALL', {queueId: '1-800-flowers'});


flowerVendor.subscribe('DELIVERED', (payload) => {
  console.log(`Thank you for delivering ${payload.orderId}`);
  flowerVendor.publish('RECEIVED', payload)
});

setInterval(() => {
    console.log('----- Order ready for pickup -----')
    let payload = {
      messageId: chance.guid(),
      store: '1-800-flowers',
      orderId: chance.integer({ min: 100000, max: 999999}),
      customer: chance.name({ nationality: 'en' }),
      address: `${chance.address()}, ${chance.city()}, ${chance.state()}`,
    }
    flowerVendor.publish('PICKUP', payload);
}, 5000);

