const socket = (io) => {
  io.on("connection", (client) => {
    console.log("new connection: ", client.id);
    client.join("room1");
    client.on("chat message", (msg) => {
      console.log(`from: ${client.id} \n message: ${msg}`);
      const messageObject = { from: client.id, message: msg };

      // sends messages to everyone in room1
      io.sockets.to("room1").emit("incoming message", messageObject);
    });
  });
};

module.exports = socket;
