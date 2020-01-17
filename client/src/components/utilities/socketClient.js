import socketClient from "socket.io-client";

const client =
  process.env.NODE_ENV === "production"
    ? socketClient("/")
    : socketClient("http://localhost:5000/");

export default client;
