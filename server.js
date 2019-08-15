const express = require("express");
const app = express(); // same as 'const app = require("express")();'
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

const convMemory = [];

io.on("connection", socket => {
  console.log(`User # connected!`);

  socket.on("send message", conv => {
    console.log("new message: ", conv);
    convMemory.push(conv[conv.length - 1]);
    console.log("mem: ", convMemory);
    io.emit("send message", conv);
  });

  socket.on("disconnect", () => {
    console.log(`User # disconnected.`);
  });
});

const PORT = process.env.PORT || 4999;
io.listen(PORT), () => console.log(`Listening on port ${PORT}`);
