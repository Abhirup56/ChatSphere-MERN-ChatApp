import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./route/user.route.js";
import messageRoute from "./route/message.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, httpServer } from "./SocketIO/server.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4001", // your frontend
    credentials: true,
  })
);

const PORT = process.env.PORT || 5001;
const URI = process.env.MONGODB_URI;

try {
  await mongoose.connect(URI);
  console.log("MongoDB CONNECTED");
} catch (error) {
  console.log(error);
}

app.use(cookieParser());
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// ✅ Static file serving in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
