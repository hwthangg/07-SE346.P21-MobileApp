import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const CommentSchema = new mongoose.Schema({
  status: { type: String, enum: ['active', 'banned', 'waiting'], default: 'waiting' },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  
  comment: { type: String, required: true },
}, { timestamps: true });

CommentSchema.plugin(mongoosePaginate);
const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
