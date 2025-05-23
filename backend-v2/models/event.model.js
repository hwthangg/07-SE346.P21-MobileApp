import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const EventSchema = new mongoose.Schema({
  status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  name: { type: String, required: true },
  startedAt: { type: Date, required: true },
  location: { type: String, required: true },
  requirement: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String, default: null }],
  scope: { type: String, enum: ['public', 'chapter'], default: 'chapter' },
  images: [{ type: String, default: null }],
  likes: { type: Number, default: 0 }
}, { timestamps: true });

EventSchema.plugin(mongoosePaginate);
const Event = mongoose.model('Event', EventSchema);

export default Event;
