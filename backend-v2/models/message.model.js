import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true }],
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  message: { type: String, required: true }
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

export default Message
