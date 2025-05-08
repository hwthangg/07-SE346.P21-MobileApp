// jobs/reminderJob.js
import cron from 'node-cron';
import Event from '../models/event.model.js';
import Message from '../models/message.model.js';
import Chapter from '../models/chapter.model.js';

export function startReminderJob(socket) {
  // Chạy mỗi phút
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000);

    try {
      // const events = await Event.find({
      //   startTime: { $gte: now, $lte: tenMinutesLater }
      // }).populate('chapter'); // Để lấy chapterId

      // for (const event of events) {
      //   const chapterId = event.chapter._id.toString();
       

      //   const messageText = `⏰ Sự kiện "${event.title}" sẽ bắt đầu lúc ${event.startTime.toLocaleTimeString()}.`;

      //   // Gửi qua socket nếu đang online
       

      //   // Lưu vào Message log để không mất
      //   const message = new Message({
      //     members: [chapterId],
      //     content: messageText,
      //     sender: 'system'
      //   });
      //   await message.save();
      // }
     
      if (socket) {
        socket.emit('event_reminder', 
        //   {
        //   // title: event.title,
        //   // startTime: event.startTime,
        //   // text: messageText
        //   'hellp'
        // }
        'help'
      );
      }
      console.log(`[cron] Đã nhắc sự kiện lúc ${now.toLocaleTimeString()}`);
    } catch (error) {
      console.error('[cron] Lỗi khi gửi nhắc sự kiện:', error.message);
    }
  });
}
