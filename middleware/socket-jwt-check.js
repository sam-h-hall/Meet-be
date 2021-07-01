const verifyJwt = require("../utils/verify-jwt");

module.exports = (socket, next) => {
  const { query } = socket.handshake,
    { token } = query;
  //{ token } = query;
  if (query && token) {
    socket.decoded = verifyJwt(token);
    next();
  } else {
    console.log("socket: something went wrong");
  }
};
