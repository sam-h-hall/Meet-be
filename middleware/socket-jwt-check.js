const { io } = require("../server");

module.exports = (req, next) => {
  io.use((socket, next) => {
    const { query } = socket.handshake,
      { token } = query;

    if (query && token) {
      socket.decoded = verifyJwt(token);
      next();
    }
  });
};
