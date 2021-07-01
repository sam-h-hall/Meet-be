require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: true,
  origins: [
    "*",
    "http://localhost",
  ],
});

const jwtCheck = require("./middleware/jwt-check");
const corsHeader = require("./middleware/cors-header");

const PORT = process.env.PORT || 8000;
const socket = require("./socket");

app.use(corsHeader);
app.use(express.json());
require("./routes/index")(app);

io.use(require("./middleware/socket-jwt-check"));

app.get("/", jwtCheck, (res) => {
  res.json({ msg: "server up and running" });
});

server.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});

// attach socket to express server
io.listen(server);
socket(io);

const connector = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    return res;
  })
  .catch((err) => {
    return err;
  });

module.exports = { app, connector };
