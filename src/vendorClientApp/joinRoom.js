'use strict';

function joinRoom(socket, payload) {
  socket.emit('JOIN', `${payload.store}`);
}

module.exports = joinRoom;
