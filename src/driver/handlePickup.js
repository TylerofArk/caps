'use strict';

module.exports = (socket) => (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    socket.emit('IN_TRANSIT', payload);
  }, 1000);
  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.orderId}`);
    socket.emit('DELIVERED', payload);
  }, 25000);
};
