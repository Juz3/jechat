const express = require("express");
const app = express(); // same as 'const app = require("express")();'
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const path = require("path");
const getTime = require("./utilities/getTime");
const connectDB = require("./config/db");

connectDB();

app.use(express.json({ extended: false }));

// Routes
app.use("/api/users", require("./routes/api/users"));
//app.use('/api/auth', require('./routes/api/auth'));

let conversationMemory = [];

io.on("connection", socket => {
  console.log(`User # connected!`);

  if (conversationMemory.length > 1) io.emit("send message", conversationMemory);
  // on send message
  socket.on("send message", conversation => {
    console.log("new message: ", conversation);

    const oldestMessageTimestamp = conversation[0].timestamp;
    const oldTime = oldestMessageTimestamp.split(":");
    const oldMsgHours = parseInt(oldTime[0]);
    //const oldMsgMinutes = parseInt(oldTime[1]);

    const newTimeHours = new Date().getHours();

    conversationMemory = conversation;

    // When over 40 messages or oldest message is over 2 hours old, remove oldest
    if (conversation.length > 40 || newTimeHours - oldMsgHours > 2) {
      //conversation.length = 1;
      conversation.splice(0, 1);
      conversationMemory.splice(0, 1);
    }

    let payload = conversationMemory;

    io.emit("send message", payload);
    //console.log(getTime());
  });

  // on disconnect
  socket.on("disconnect", () => {
    console.log(`User # disconnected.`);
  });
});

// Serve static build in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT), () => console.log(`Listening on port ${PORT}`);
