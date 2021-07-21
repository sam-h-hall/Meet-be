import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import http from "http";
import corsHeader from "./middleware/cors-header";
import * as socketio from "socket.io";
import jwtCheck from "./middleware/jwt-check";
import socketJwtCheck from "./middleware/socket-jwt-check";
import socket from "./socket";
import login from "./routes/login";
import register from "./routes/register";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io: socketio.Server = new socketio.Server();

const options: any = {
  cors: true,
  origin: ["*", "http://localhost:3000"],
};

io.attach(server, options);
//io.use(socketJwtCheck);
io.listen(server);
socket(io);

const PORT = process.env.PORT || 8000;

app.use(corsHeader);
app.use(express.json());
app.use("/login", login);
app.use("/register", register);

app.get("/", jwtCheck, (res: any) => {
  res.json({ msg: "server up and running" });
});

server.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});

const connector = mongoose
  .connect(<string>process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connector success ", res);
    res;
  })
  .catch((err) => {
    console.log("connector err: ", err);
    err;
  });

export default { app, connector };
