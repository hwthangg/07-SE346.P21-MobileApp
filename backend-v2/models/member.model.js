import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const MemberSchema = new mongoose.Schema({
  status: { type: String, enum: ['active', 'unknow', 'waiting'], default: 'waiting' },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  position: { type: String, enum: ['Bí thư', 'Phó Bí thư', 'Ủy viên BCH', 'Đoàn viên'], default: 'Đoàn viên' },
  cardId:{ type: String, required: true },
  joinedAt: { type: Date, required: true },
  address: { type: String, required: true },
  hometown: { type: String, required: true },
  ethnicity: { type: String, required: true },
  religion: { type: String, required: true },
  eduLevel: { type: String, required: true }
}, { timestamps: true });


MemberSchema.plugin(mongoosePaginate);
const Member = mongoose.model('Member', MemberSchema);

export default Member;
