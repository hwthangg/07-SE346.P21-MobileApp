import mongoose, {Schema} from "mongoose";


const TransferSchema = new Schema({
  memberId: {
    type: mongoose.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  chapterId: {
    type: mongoose.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted'],
    default: 'pending'
  }
}, {
  timestamps: true // tự động thêm createdAt và updatedAt
});

const TransferLog = mongoose.model('Transfer', TransferSchema, 'transfer_log_collection');

export default TransferLog
