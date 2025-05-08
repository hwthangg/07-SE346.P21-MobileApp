import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cookie from 'cookie'
import { Server } from "socket.io";
import http from "http";
import cron from 'node-cron';


configDotenv();
const PORT = process.env.PORT;
const DB_CONNECT_STRING = process.env.DB_CONNECT_STRING;

mongoose
  .connect(DB_CONNECT_STRING)
  .then(() => console.log("💻 MongoDB Connected"))
  .catch((err) => console.error(err));

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  // ⚠️ KHÔNG được để '*'
  credentials: true                 // ⚠️ BẮT BUỘC khi dùng cookie
}));
app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true     
  },
});



const users = {};


io.on("connection", (socket) => {
  console.log("Client connected:", socket.id); 
  const cookies = cookie.parse(socket.handshake.headers.cookie || '');
  const chapterId = cookies.chapterId;
  users[chapterId] = socket.id;
  console.log(users);
  cron.schedule('*/10 * * * * *', async () => {
    const now = new Date();
    const oneMinuteLater = new Date(now.getTime() + 10 * 60 * 1000);
    try {
      // Tìm các sự kiện sẽ bắt đầu trong 1 phút tới
      const upcomingEvents = await Event.find({
        startTime: { $lte: oneMinuteLater },
        status: 'pending',
        chapterId: chapterId
      });
  
      for (const event of upcomingEvents) {
        const diffMs = event.startTime - now;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      
        // Trạng thái 1: Sắp diễn ra
        if (event.startTime >= now && event.startTime <= oneMinuteLater) {
          const notice = new Notification({
            chapterId: chapterId,
            eventId: event._id,
            content: `${event.title} sẽ bắt đầu sau ${diffHours} giờ ${diffMinutes} phút ${diffSeconds} giây`
          });
          console.log(notice)
          socket.emit('event_reminder', notice);
          await notice.save();
          console.log(`[cron][PID: ${process.pid}] 🔔 Nhắc sự kiện sắp diễn ra: ${event.title}`);
        }
      
        // Trạng thái 2: Đang diễn ra
        else if (event.startTime <= now) {
          const notice = new Notification({
            chapterId: chapterId,
            eventId: event._id,
            content: `${event.title} đang diễn ra`
          });
          socket.emit('event_reminder', notice);
          event.status='completed'
          await event.save()
          await notice.save();
          console.log(`[cron][PID: ${process.pid}] 🟢 Sự kiện đang diễn ra: ${event.title}`);
        }
      }
      
  
      if (upcomingEvents.length === 0) {
        console.log(`[cron][PID: ${process.pid}] ✅ Không có sự kiện nào cần nhắc lúc ${now.toLocaleTimeString()}`);
      }
    } catch (err) {
      console.error('❌ Lỗi khi kiểm tra sự kiện:', err);
    }
  })
 


 

  socket.on("chat", async (msg) => {
    console.log("Received:", msg);
    const targetId = users[msg.to];
    if (targetId && targetId !== socket.id) {
      io.to(targetId).emit("chat", msg);
    }
    const message = new Message({ members: [chapterId, msg.to], content: msg.text, sender: chapterId });
    await message.save();
  })
   socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    for (let key in users) {
      if (users[key] === socket.id) {
        delete users[key];
      }
    }
    console.log("Users after disconnect:", users);
  });
});

 
// Routes
import UserRoutes from "./routes/user.routes.js";
import ChapterRoutes from "./routes/chapter.routes.js";
import MemberRoutes from "./routes/member.routes.js";
import DocumentRoutes from "./routes/document.routes.js";
import EventRoutes from "./routes/event.routes.js";
import Message from "./models/message.model.js";
import MessageRoutes from "./routes/message.routes.js";
import Chapter from "./models/chapter.model.js";
import { startReminderJob } from "./jobs/reminderJob.js";
import Event from "./models/event.model.js";
import Notification from "./models/notification.model.js";
import NotificationRoutes from "./routes/notification.routes.js";

app.get("/", (req, res) => {
  res.status(200).send({ message: "HwThang's Server", data: {} });
});

app.use("/api/users", UserRoutes);
app.use("/api/chapters", ChapterRoutes);
app.use("/api/members", MemberRoutes);
app.use("/api/documents", DocumentRoutes);
app.use("/api/events", EventRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/notifications", NotificationRoutes)

// KHỞI ĐỘNG SERVER ĐÚNG CÁCH
server.listen(PORT, () => {
  console.log(`Server + Socket.IO running at http://localhost:${PORT}`);
})
