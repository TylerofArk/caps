'use strict';

module.exports = (socket) => (text) => {
  console.log('Sending Message: ', text);
  socket.emit('EVENT', { text });
};

