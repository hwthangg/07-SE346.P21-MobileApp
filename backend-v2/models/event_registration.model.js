import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const EventRegistrationSchema = new mongoose.Schema({
  status: { type: String, enum: ['attended', 'registered'], default: 'registered' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true });

EventRegistrationSchema.plugin(mongoosePaginate);
const EventRegistration = mongoose.model('EventRegistration', EventRegistrationSchema);

export default EventRegistration;
