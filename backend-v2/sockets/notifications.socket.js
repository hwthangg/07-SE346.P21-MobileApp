
// import { verifyToken } from '../utils/handleToken';
import {Account, Event, EventRegistration, Notification} from '../models/index.js'
import { verifyToken } from '../utils/handleToken.js';

export const sendInvite = (socket, io) => {
  socket.on('send_invite', async ({ senderId, eventId, inviteeId }) => {
    try {
      // 1. Xác thực token người gửi
      // const decoded = verifyToken(token);
      // const senderId = decoded.id;

      const sender = await Account.findById(senderId)

      console.log(sender)
      
      // 2. Kiểm tra sự kiện tồn tại
      const event = await Event.findById(eventId);
      if (!event) throw new Error('Sự kiện không tồn tại');

      // 3. Tạo thông báo mời
      const notification = new Notification({
        accountId: inviteeId,
        content: `Bạn được mời tham gia "${event.name}" bởi ${sender.fullname}`,
        type: 'event_invite',
        metadata: { eventId, senderId }
      });
      await notification.save();

      // 4. Gửi real-time đến người được mời
      io.to(`user_${inviteeId}`).emit('new_invite', notification);
      
    } catch (err) {
      socket.emit('error', err.message);
    }
  });
};

export const reminder = (socket, io) => {
  socket.on('setup_reminders', async (token) => {
    try {
      // 1. Xác thực token (chỉ admin/chapter leader)
      const decoded = verifyToken(token);
      if (!['admin', 'manager'].includes(decoded.role)) {
        throw new Error('Không có quyền');
      }

      // 2. Tìm sự kiện sắp diễn ra trong 24h
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const events = await Event.find({
        startedDate: { 
          $gte: tomorrow,
          $lt: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
        },
        status: 'active'
      });

      // 3. Gửi nhắc nhở đến người đăng ký
      for (const event of events) {
        const registrations = await EventRegistration.find({
          eventId: event._id,
          status: 'registered'
        });

        for (const reg of registrations) {
          const notification = new Notification({
            accountId: reg.memberId,
            content: `Sự kiện "${event.name}" bắt đầu sau 24h tại ${event.location}`,
            type: 'event_reminder'
          });
          await notification.save();
          io.to(`user_${reg.memberId}`).emit('event_reminder', notification);
        }
      }
    } catch (err) {
      console.error('Reminder error:', err);
    }
  });
};