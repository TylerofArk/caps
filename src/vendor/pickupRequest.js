'use strict';

const Chance = require('chance');
const chance = new Chance();

module.exports = (socket) => (store) => {
  console.log('----- Order ready for pickup -----')
  let payload = {
    store,
    orderId: chance.integer({ min: 100000, max: 999999}),
    customer: chance.name({ nationality: 'en' }),
    address: `${chance.address()}`,
  };
  socket.emit('PICKUP', payload);
}

// module.exports = pickupRequest;
