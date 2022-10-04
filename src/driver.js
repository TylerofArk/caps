'use strict';

let eventPool = require('./eventPool');

module.exports = (payload) => {
  console.log(`Order pickup in progress: ${payload.order.orderID}`);
  console.log(`Order in transit`, payload);
  console.log(`Order delivery complete, ${payload.order.orderID}`);
};
