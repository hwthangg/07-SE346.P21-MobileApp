const mongoose = require('mongoose');

const TransferLogSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'accepted'], // Đang chờ, Đã tiếp nhận
    default: 'pending'
  }
});

module.exports = mongoose.model('TransferLog', TransferLogSchema, 'TransferLogCollection');
