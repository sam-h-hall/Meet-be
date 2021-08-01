import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import http from "http";
import corsHeader from "./middleware/cors-header";
import * as socketio from "socket.io";
import jwtCheck from "./middleware/jwt-check";
//import socketJwtCheck from "./middleware/socket-jwt-check";
import socket from "./socket";
import login from "./routes/login";
import register from "./routes/register";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./database/models/resolvers";
import { typeDefs } from "./database/models/typeDefs";

dotenv.config();

const startServer = async () => {
  try {
    const app = express();
    const httpServer = http.createServer(app);
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();
    const io: socketio.Server = new socketio.Server();
    const options: any = {
      cors: true,
      origin: [
        "*",
        "http://localhost:3000",
        "https://studio.apollographql.com",
      ],
    };
    io.attach(httpServer, options);
    io.listen(httpServer);
    socket(io);

    const PORT = process.env.PORT || 8000;

    app.use(corsHeader);
    app.use(express.json());
    app.use("/login", login);
    app.use("/register", register);
    app.get("/", jwtCheck, (res: any) => {
      res.json({ msg: "server up and running" });
    });

    apolloServer.applyMiddleware({ app });

    await mongoose
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

    httpServer.listen(PORT, () => {
      console.log(`App listening on port: ${apolloServer.graphqlPath}`);
      //console.log(`App listening on port: ${PORT}`);
    });
  } catch (err) {
    console.log("err: ", err);
  }
};

startServer();

//io.use(socketJwtCheck);

export default { startServer };
