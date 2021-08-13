const { randomBytes } = require("crypto");
const express = require("express");
const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log("Server listening at port http://localhost:%d", port);
});

let numUsers = 0;

io.on("connection", (socket) => {
  ++numUsers;

  io.sockets.emit("user:join", { usersCount: numUsers });

  socket.on("room:create", (data) => {
    if (socket.room) return;

    const roomId = randomBytes(3).toString("hex");
    socket.join(roomId);
    socket.room = roomId;
    socket.username = data.username;

    socket.emit("room:join", { room_id: roomId });
  });

  socket.on("room:join", (data) => {
    socket.join(data.room_id);
    socket.room = data.room_id;
    socket.emit("room:join", { room_id: data.room_id });
  });

  socket.on("message", (data) => {
    io.to(socket.room).emit("user:message", { text: data.text });
  });

  socket.on("disconnect", () => {
    --numUsers;

    socket.broadcast.emit("user:left", {
      usersCount: numUsers,
    });
  });
});
