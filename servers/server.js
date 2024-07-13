const io = require("socket.io")(8000, {
  cors: {
    origin: ["http://127.0.0.1:3000"],
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("user-joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-details", name);
    // console.log(socket);
  });

  socket.on("send-msg", (message) => {
    socket.broadcast.emit("recieve", { msg: message, name: users[socket.id] });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
