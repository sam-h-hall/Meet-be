const socket = (io: any) => {
  io.on("connection", (client: any) => {
    const globRoom = "globRoom";

    client.join(globRoom);
    client.on(
      "chat message",
      (msg: { _from_id: string; from_id: string; message: string }) => {
        console.log("Full message ", msg);
        const { message, from_id } = msg;
        io.sockets.to(globRoom).emit("message", { message, from_id });
      }
    );
  });
};

export default socket;
