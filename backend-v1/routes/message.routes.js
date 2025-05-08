
import express from "express";
import MessageController from "../controllers/message.controller.js";

const MessageRoutes = express.Router();

MessageRoutes.get('/conversations/:chapterId', MessageController.getConversation)
MessageRoutes.get('/messages/:chapterId', MessageController.getMessages)

export default MessageRoutes