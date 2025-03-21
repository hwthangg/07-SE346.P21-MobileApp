const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['active', 'inactive', 'banned'],
      default: 'active'
    },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, unique: true, sparse: true },
    fullname: { type: String, trim: true },
    birthday: { type: Date, default: null },
    gender: { type: String, enum: ['male', 'female', 'other'], default: null },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    chapter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      default: null
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
