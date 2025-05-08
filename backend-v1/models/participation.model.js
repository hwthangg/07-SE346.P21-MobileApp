import mongoose from 'mongoose';

const { Schema } = mongoose;

// Định nghĩa Schema cho Participation
const ParticipationSchema = new Schema({
  memberId: {
    type: Schema.Types.ObjectId,
    ref: 'Member', // Tham chiếu đến schema 'Member'
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event', // Tham chiếu đến schema 'Event'
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Thời gian tạo mặc định là thời gian hiện tại
  },
});

// Tạo mô hình Participation từ Schema
const Participation = mongoose.model('Participation', ParticipationSchema, 'participation_collection');

export default Participation;
