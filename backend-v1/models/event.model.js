// models/eventModel.js
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  chapterId: {
    type: mongoose.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: [String],
    default: []
  },
  location: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  requirement: {
    type: String,
    default: null
  },
  images: {
    type: [String],
    default: []
  },
  likes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'ongoing', 'completed', 'deleted'],
    default: 'pending'
  }
}, {
  timestamps: true // createdAt và updatedAt
});

const Event = mongoose.model('Event', EventSchema, 'event_collection');
export default Event;
