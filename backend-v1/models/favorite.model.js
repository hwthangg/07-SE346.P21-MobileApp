import mongoose from 'mongoose';

const { Schema } = mongoose;

// Định nghĩa Schema cho Favorite
const FavoriteSchema = new Schema({
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
  createdAt: {
    type: Date,
    default: Date.now, // Thời gian tạo mặc định là thời gian hiện tại
  },
});

// Tạo mô hình Favorite từ Schema
const Favorite = mongoose.model('Favorite', FavoriteSchema, 'favorite_collection');

export default Favorite;
