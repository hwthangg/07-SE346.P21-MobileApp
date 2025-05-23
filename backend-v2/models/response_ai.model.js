import mongoose from 'mongoose';

const ResponseAISchema = new mongoose.Schema({
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  requirement: { type: String, required: true },
  response: { type: String, required: true }
}, { timestamps: true });

const ResponseAI = mongoose.model('ResponseAI', ResponseAISchema);

export default ResponseAI
