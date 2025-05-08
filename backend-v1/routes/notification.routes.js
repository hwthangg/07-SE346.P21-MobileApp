
import express from 'express'
import Notification from '../models/notification.model.js'

const NotificationRoutes = express.Router()

NotificationRoutes.get('/', async(req, res)=>{

  const chapterId = req.cookies.chapterId

  const notifications = await Notification.find({chapterId: chapterId})

  res.json(notifications)

})

export default NotificationRoutes