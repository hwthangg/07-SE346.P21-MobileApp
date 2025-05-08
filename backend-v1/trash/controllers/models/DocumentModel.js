const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  type: {
    type: String,
    enum: ['activity', 'administrative', 'minutes', 'Other'], // Loại tài liệu (Tài liệu sinh hoạt, văn bản hành chính, biên bản họp, khác)
    required: true
  },
  issuer: {
    type: String,
    required: true,
    trim: true
  },
  issuedDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  file: {
    type: String,
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
    enum: ['active', 'deleted'],
    default: 'active'
  }
});

module.exports = mongoose.model('Document', DocumentSchema, 'DocumentCollection');