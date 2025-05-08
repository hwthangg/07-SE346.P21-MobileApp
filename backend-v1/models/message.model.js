// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true
    }
  ],
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);
export default Message
