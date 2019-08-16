const express = require("express");
const app = express(); // same as 'const app = require("express")();'
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

let msgMemory = [];

io.on("connection", socket => {
  console.log(`User # connected!`);

  io.emit("send message", [
    {
      user: "user1",
      msg: "msg1",
      timestamp: "9:99:99PM"
    }
  ]);

  socket.on("send message", msg => {
    console.log("new message: ", msg);

    /*     // Save to memory, no db yet
    msgMemory.push(msg[msg.length - 1]);

    console.log("mem: ", msgMemory); */

    const timestamp = new Date();
    const formattedTime = (
      timestamp.getHours() +
      ":" +
      timestamp.getMinutes() +
      ":" +
      timestamp.getSeconds()
    ).toString();

    payload = [
      {
        user: "defaultUser",
        msg: msg,
        timestamp: timestamp
      }
    ];
    // emit to clients
    io.emit("send message", payload);
    console.log(formattedTime);
  });

  socket.on("disconnect", () => {
    console.log(`User # disconnected.`);
  });
});

const PORT = process.env.PORT || 4999;
io.listen(PORT), () => console.log(`Listening on port ${PORT}`);
