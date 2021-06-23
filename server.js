const app = require("./index");
const mongoose = require("mongoose");

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: true,
  origins: ["*"],
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`*** Listening on port ${PORT} ***`);
});

// attach socket to express server
io.listen(server);
require("./socket")(io);

const uri =
  "mongodb+srv://sam-h-hall:bfHn3Bcre9AdsrHM@cluster0.avbwg.mongodb.net/Meet-db?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!!");
  })
  .catch((err) => {
    console.log(err.message);
  });
