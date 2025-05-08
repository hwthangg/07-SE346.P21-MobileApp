import mongoose, { Schema } from "mongoose";

// Define Document schema
const DocumentSchema = new Schema({
  chapterId: {
    type: mongoose.Types.ObjectId,
    ref: 'Chapter', // Reference to the Chapter collection
    required: true,
  },
  type: {
    type: String,
    enum: ['Activity Document', 'Administrative Document', 'Meeting Minutes', 'Other'], // Document types
    required: true,
  },
  issuer: {
    type: String, // Issuing organization or person
    required: true,
    trim: true,
  },
  issuedDate: {
    type: Date, // Date when the document was issued
    required: true,
  },
  description: {
    type: String, // Brief description of the document
    required: true,
    trim: true,
  },
  file: {
    type: String, // File path or file URL
    required: true,
    trim: true,
  },
  
  status: {
    type: String, // Document status
    enum: ['activated', 'deleted'], // 'active' for visible, 'deleted' for soft delete
    default: 'activated',
  }
},{timestamps: true});

// Create model for the Document schema
const Document = mongoose.model("Document", DocumentSchema, "document_collection");

export default Document;
