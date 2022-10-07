'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');
const Chance = require('chance');
const chance = new Chance();
const MessageClient = require('../lib/messageClient');
const widgetVendor = new MessageClient('acme-widgets')

// const pickupRequest = require('../widgets/pickupRequest');

widgetVendor.publish('GETALL', {queueId: 'acme-widgets'});


widgetVendor.subscribe('DELIVERED', (payload) => {
  console.log(`Thank you for delivering ${payload.orderID}`);
  widgetVendor.publish('RECEIVED', payload)
});

setInterval(() => {
    console.log('----- Order ready for pickup -----')
    let payload = {
      messageId: chance.guid(),
      store: 'acme-widgets',
      orderId: chance.integer({ min: 100000, max: 999999}),
      customer: chance.name({ nationality: 'en' }),
      address: `${chance.address()}, ${chance.city()}, ${chance.state()}`,
    }
    widgetVendor.publish('PICKUP', payload);
}, 5000);

