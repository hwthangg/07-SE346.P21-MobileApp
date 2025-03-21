const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String },
    issuer: { type: String },
    issuedDate: { type: Date },
    description: { type: String },
    file: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Document', DocumentSchema)
