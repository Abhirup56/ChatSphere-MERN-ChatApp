import { get } from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReciver } from "../SocketIO/server.js";
import { io } from "../SocketIO/server.js"; // ✅ make sure the path is correct


export const sendmsg = async (req, res) => {
  try {
    const message = req.body.message;
    const senderId = req.user._id;
    const { id: recevierId } = req.params;

    let convo = await Conversation.findOne({
      member: { $all: [senderId, recevierId] },
    });

    if (!convo) {
      convo = await Conversation.create({
        member: [senderId, recevierId],
        message: [],
      });
    }

    const newMsg = await Message.create({
      senderId,
      recevierId,
      message,
    });
    const recevierSocket = getReciver(recevierId);
    if (recevierSocket) {
      io.to(recevierSocket).emit("NewMessage", {
        senderId,
        message: newMsg.message,
      });
    }

    convo.message.push(newMsg._id);
    await convo.save();

    return res.status(201).json(newMsg); // ✅ Only sending the saved message
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getmsg = async (req, res) => {
    try {
        const { id: chatuser } = req.params;
        const senderId = req.user._id;
    
        const convo = await Conversation.findOne({
        member: { $all: [senderId, chatuser] },
        }).populate("message");
    
        if (!convo) {
        return res.status(404).json({ message: "Conversation not found" });
        }
    
        return res.status(200).json(convo); // Just return the messages array
;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}