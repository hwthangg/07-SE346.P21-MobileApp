import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const AccountSchema = new mongoose.Schema({
  status: { type: String, enum: ['active', 'banned', 'waiting'], default: 'waiting' },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String},
  avatar: { type: String, default: null },
  fullname: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: { type: String, enum: ['Nam', 'Nữ'], default: 'Nam' },
  role: { type: String, enum: ['admin', 'manager', 'member'], default: 'member' },
  infoMember: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', default: null },
  managerOf: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', default: null }
}, { timestamps: true });

AccountSchema.plugin(mongoosePaginate);

const Account = mongoose.model('Account', AccountSchema);


export default Account;
