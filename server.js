const express = require("express");
const app = express(); // same as 'const app = require("express")();'
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const path = require("path");

let msgMemory = [];

getTime = () => {
  const time = new Date();
  const hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  if (seconds < 10) seconds = ("0" + seconds).toString();
  if (minutes < 10) minutes = ("0" + minutes).toString();

  const formattedTime = hours + ":" + minutes + ":" + seconds;

  return formattedTime;
};

/* io.on("connection", socket => {
  console.log(`User # connected!`);

  // Initial test message
  io.emit("send message", [
    {
      user: "server",
      msg: "initial test message",
      timestamp: getTime()
    }
  ]);

  socket.on("send message", msg => {
    console.log("new message: ", msg);

    console.log(msg.length);

    if (msg.length > 20) {
      msg.length = 1;
    }

    const timestamp = new Date();
    const formattedTime = (
      timestamp.getHours() +
      ":" +
      timestamp.getMinutes() +
      ":" +
      timestamp.getSeconds()
    ).toString();

    let payload = msg;
    // emit to clients
    io.emit("send message", payload);
    console.log(formattedTime);
  });

  socket.on("disconnect", () => {
    console.log(`User # disconnected.`);
  });
}); */

/* // FOR DEV TESTING BUILD LOCALLY

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
}); */

// Serve static build in prod
if (process.env.NODE_ENV === "production") {
  console.log("node env", process.env.NODE_ENV);
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  console.log("node env", process.env.NODE_ENV);
}

const PORT = process.env.PORT || 4999;
//io.listen(PORT), () => console.log(`Listening on port ${PORT}`);
app.listen(PORT), () => console.log(`Listening on port ${PORT}`);
