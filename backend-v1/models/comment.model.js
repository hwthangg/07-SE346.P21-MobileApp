import mongoose from 'mongoose';

const { Schema } = mongoose;

// Định nghĩa Schema cho Comment
const CommentSchema = new Schema({
  chapterId: {
    type: Schema.Types.ObjectId,
    ref: 'Chapter', // Giả sử bạn đã có schema cho 'Chapter'
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event', // Giả sử bạn đã có schema cho 'Event'
    required: true,
  },
  content: {
    type: String,
    required: true, // Nội dung bình luận là bắt buộc
  },
  createdAt: {
    type: Date,
    default: Date.now, // Thời gian tạo bình luận mặc định là thời gian hiện tại
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Thời gian cập nhật bình luận mặc định là thời gian hiện tại
  },
  status: {
    type: String,
    enum: ['activated', 'deleted'], // Trạng thái có thể là 'Hiện' hoặc 'Đã xóa'
    default: 'activated', // Mặc định là 'Hiện'
  },
});

// Tạo mô hình Comment từ Schema
const Comment = mongoose.model('Comment', CommentSchema, 'comment_collection');

export default Comment;
