function initSockets(io) {
  io.on('connection', (socket) => {
    socket.on('join-order', (orderRef) => socket.join(`order:${orderRef}`));
    socket.on('join-role', (role) => socket.join(`role:${role}`));
    socket.on('rider-location', ({ order_ref, location }) => io.to(`order:${order_ref}`).emit('rider-location', location));
  });
}
module.exports = initSockets;
