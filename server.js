const express = require("express");
const app = express(); // <-- same as 'require("express")();'
const http = require("http");
const httpServer = http.createServer(app);
/* const https = require("https");
const httpsServer = https.createServer(app) */
const io = require("socket.io")(httpServer);
const path = require("path");
const getTime = require("./utilities/getTime");
const connectDB = require("./config/db");
const sslRedirect = require("heroku-ssl-redirect");

connectDB();

app.use(express.json({ extended: false }));

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Direct http requests to https
app.use(sslRedirect());

// save conversation history to an array (before implementing database)
let lobby_ConversationMemory = [];
let ch1_ConversationMemory = [];

io.on("connection", socket => {
  console.log(`User connected!`);

  const lobby = "lobby";
  const ch1 = "channel-1";

  socket.on("liveSketch", data => socket.broadcast.emit("liveSketch", data));

  socket.on("liveSketchClearCanvas", data =>
    socket.broadcast.emit("liveSketchClearCanvas", data)
  );

  socket.on("join", room => {
    socket.join(room, () => {
      console.log("joined room", room);
      //io.to(room).emit("a new user has joined the channel!");

      if (room === lobby) {
        if (lobby_ConversationMemory.length > 0) {
          console.log("emit to lobby");
          io.to(lobby).emit("send message", lobby_ConversationMemory);
        }
      } else if (room === ch1) {
        if (ch1_ConversationMemory.length > 0) {
          console.log("emit to channel-1");
          io.to(room).emit("send message", ch1_ConversationMemory);
        }
      }

      // on send message
      socket.on("send message", conversation => {
        console.log(
          "New message! | Room:",
          room,
          "| Username:",
          conversation[conversation.length - 1].user.username,
          "| Msg:",
          conversation[conversation.length - 1].msg,
          "|"
        );

        if (room === lobby) {
          lobby_ConversationMemory = conversation;
          // When over 40 messages, remove oldest
          if (conversation.length >= 40) {
            conversation.splice(0, 1);
            lobby_ConversationMemory.splice(0, 1);
          }

          /* [
            {
              user: { username: "juz", color: "rgb(224, 178, 27)" },
              msg: "aaa",
              timestamp: "23:55:55"
            }
          ]; */

          let lobbyPayload = lobby_ConversationMemory;
          io.to(lobby).emit("send message", lobbyPayload);
        } else if (room === ch1) {
          ch1_ConversationMemory = conversation;
          if (conversation.length > 40) {
            conversation.splice(0, 1);
            ch1_ConversationMemory.splice(0, 1);
          }

          let ch1Payload = ch1_ConversationMemory;
          io.to(ch1).emit("send message", ch1Payload);
        }
      });
    });
  });

  // For refreshing message history when navigating from other pages back to chat page,
  // without refreshing browser.
  socket.on("refresh", room => {
    if (room === lobby) {
      io.to(lobby).emit("send message", lobby_ConversationMemory);
      console.log("refresh lobby", room);
    } else if (room === ch1) {
      io.to(ch1).emit("send message", ch1_ConversationMemory);
      console.log("refresh channel-1", room);
    }
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
    /*     // redirect all requests from http to https
    if (req.headers["x-forwarded-proto"] !== "https") {
      res.redirect("https://" + req.hostname + req.url);
      console.log(req.headers["x-forwarded-proto"]);
    } else {
      console.log(req.headers, req.headers["x-forwarded-proto"]);
    } */
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT), () => console.log(`Listening on port ${PORT}`);
