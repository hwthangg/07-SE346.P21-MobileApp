const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  tag: {
    type: [String],
    enum: ['children', 'politics', 'education', 'volunteering', 'sports', 'other'],
    default: []
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  startTime: {
    type: Date,
    required: true
  },
  requirement: {
    type: String,
    trim: true
  },
  images: {
    type: [String],
    default: []
  },
  likes: {
    type: Number,
    default: 0
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
    enum: ['pending', 'ongoing', 'completed'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Event', EventSchema, 'EventCollection');
