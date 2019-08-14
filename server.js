const express = require("express");
const app = express(); // same as 'const app = require("express")();'
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

io.on("connection", socket => {
  console.log(`User # connected!`);
  socket.on("chat message", msg => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });
  socket.on("disconnect", () => {
    console.log(`User # disconnected.`);
  });
});

const PORT = process.env.PORT || 4999;

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
