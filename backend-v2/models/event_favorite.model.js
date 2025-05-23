import mongoose from 'mongoose';

const EventFavoriteSchema = new mongoose.Schema({
  status: { type: String, enum: ['like', 'unlike'], default: 'like' },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
}, { timestamps: true });

const EventFavorite = mongoose.model('EventFavorite', EventFavoriteSchema);

export default EventFavorite;
