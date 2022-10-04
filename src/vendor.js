'use strict';

let eventPool = require('./eventPool');

module.exports = (payload) => {
  console.log(`${payload.order.name} has been delivered. Thank you for using CAPS!`);
};
