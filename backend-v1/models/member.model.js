import mongoose, { Schema } from "mongoose";

const MemberSchema = new mongoose.Schema({
  chapterId: {
    type: mongoose.Types.ObjectId,
    ref: 'Chapter',
    default: null
  },
  cardId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  avatar: {
    type: String,
    default: ''
  },
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  birthday: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  hometown: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  ethnicity: {
    type: String,
    required: true,
    trim: true
  },
  eduLevel: {
    type: String,
    required: true,
    trim: true
  },
  religion: {
    type: String,
    required: true,
    trim: true
  },
  joinedDate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    
    trim: true
  },
  phone: {
    type: String,
    required: true,
    
    trim: true
  },
  position: {
    type: String,
    enum: ['secretary', 'vice-secretary', 'member', 'unionist'],
    runValidators: true,
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
    enum: ['activated', 'deleted'],
    default: 'activated'
  }
});

const Member = mongoose.model('Member', MemberSchema, 'member_collection');
export default Member
