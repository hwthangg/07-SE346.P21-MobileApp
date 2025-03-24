const mongoose = require('mongoose')

const ChapterSchema = new mongoose.Schema(
  {
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    name: { type: String, required: true },
    address: { type: String, required: true },
    affiliated: { type: String },
    established_date: { type: Date }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Chapter', ChapterSchema)
