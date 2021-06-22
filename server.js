const express = require("express");
const cors = require("cors");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: true,
  origins: ['*'],
});

const PORT = process.env.PORT || 8000;

app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  res.send("hello world");
});

server.listen(PORT, () => {
  console.log(`*** Listening on port ${PORT} ***`);
});

// attach socket to express server
io.listen(server);
require("./socket")(io);
