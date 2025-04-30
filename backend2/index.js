import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoute from "./route/user.route.js"
import messageRoute from "./route/message.route.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import { app, httpServer } from "./SocketIO/server.js";

dotenv.config()

app.use(express.json())

app.use(cors({
  origin: "http://localhost:4001", // ✅ your frontend URL
  Credentials: true,               // ✅ allow cookies / tokens
}))

const PORT = process.env.PORT ||5001
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI)
    console.log("MongoDB CONNECTED")
} catch (error) {
    console.log(error);
}
app.use(cookieParser());
app.use("/api/user",userRoute)
app.use("/api/message",messageRoute)
httpServer.listen(PORT, () => {
  console.log(`server on port ${PORT}`)
})