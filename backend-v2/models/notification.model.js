import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  content: { type: String, required: true }
}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification
