import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://chatsphereapp-jp70.onrender.com",
    methods: ["GET", "POST"],
  },
});

export const getReciver = (recevierId)=>{
  return users[recevierId];
}

const users = {};
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("hello",users)
  }
  io.emit("Online", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete users[userId];
    io.emit("Offline", Object.keys(users));
  });
});

export {app, httpServer, io};
