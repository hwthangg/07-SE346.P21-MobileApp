
import express from 'express'
import ConversationController from '../controllers/conversation.controller.js';

const ConversationRoutes = express.Router()

ConversationRoutes.get('/', ConversationController.getConversations)
ConversationRoutes.get('/messages/:partnerId', (req, res)=>{console.log(req.params.chapterId);res.send('get messages')})

export default ConversationRoutes