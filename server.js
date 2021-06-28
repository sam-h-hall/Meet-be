require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

console.log(process.env.PORT)

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: true,
  origins: [
    "*",
    "localhost",
    "http://localhost:3000/login",
    "http://localhost:3000/register",
  ],
});

const login = require("./routes/login");
const register = require("./routes/register");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*", "localhost:3000"); // update to match the domain you will make the request from
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTION, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("server up and running");
});

app.use(cors());
app.use(express.json());

require("./routes/index")(app);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});

// attach socket to express server
io.listen(server);
require("./socket")(io);

//const uri =
  //"mongodb+srv://sam-h-hall:bfHn3Bcre9AdsrHM@cluster0.avbwg.mongodb.net/Meet-db?retryWrites=true&w=majority";

const connector = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    return res
  })
  .catch((err) => {
    return err
  });

module.exports = {app, connector};
