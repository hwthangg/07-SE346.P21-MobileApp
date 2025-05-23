import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ChapterSchema = new mongoose.Schema({
  status: { type: String, enum: ['active', 'banned'], default: 'active' },
  name: { type: String, required: true },
  affiliated: { type: String, required: true },
  address: { type: String, required: true },
  establishedAt: { type: Date, required: true }
}, { timestamps: true });

ChapterSchema.plugin(mongoosePaginate);
const Chapter = mongoose.model('Chapter', ChapterSchema);

export default Chapter;
