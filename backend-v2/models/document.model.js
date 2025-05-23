import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const DocumentSchema = new mongoose.Schema({
  status: { type: String, enum: ['active', 'deleted'], default: 'active' },
  chapterId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  docId:{ type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['Nghị quyết', 'Biên bản', 'Báo cáo', 'Tài liệu sinh hoạt', 'Khác'], default: 'Khác' },
  scope: { type: String, enum: ['private', 'chapter'], default: 'chapter' },
  issuer: { type: String, required: true },
  issuedAt: { type: Date, required: true },
  description: { type: String, required: true },
  file: { type: String, required: true }
}, { timestamps: true });

DocumentSchema.plugin(mongoosePaginate);

const Document = mongoose.model('Document', DocumentSchema);

export default Document;
