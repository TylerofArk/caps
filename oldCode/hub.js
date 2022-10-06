'use strict';

const eventPool = require ('./eventPool');
require('./driverHandler');
require('./vendorHandler');


eventPool.on('PICKUP', (payload) => logEvent('PICKUP', payload));
eventPool.on('TRANSIT', (payload) => logEvent('TRANSIT', payload));
eventPool.on('DELIVERED', (payload) => logEvent('DELIVERED', payload));

function logEvent(event, payload){
  const date = new Date();
  const time = date.toTimeString();
  console.log('EVENT', {event, time, payload});
}



