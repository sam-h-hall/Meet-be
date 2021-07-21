import { Socket } from "socket.io";
import verifyJwt from "../utils/verify-jwt";

const socketJwtCheck = (socket: Socket, next: any) => {
  const { query } = socket.handshake,
    { token } = query;
  if (query && token) {
    (<any>socket).decoded = verifyJwt(<any>token);
    console.log((<any>socket).decoded);
    next();
  } else {
    //console.log("socket-jwt-error: ", socket);
    console.log("socket-jwt-check: something went wrong");
  }
};

export default socketJwtCheck;
