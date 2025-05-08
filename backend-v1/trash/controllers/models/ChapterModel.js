const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  leaderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  affiliated: {
    type: String,
    required: true,
    trim: true
  },
  establishedDate: {
    type: Date,
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

module.exports = mongoose.model('Chapter', ChapterSchema, "ChapterCollection");
