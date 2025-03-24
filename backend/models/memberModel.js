const mongoose = require("mongoose");


const MemberSchema = new mongoose.Schema({
  cardId: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  fullname: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: null,
    required: true,
  },
  contact: {
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid phone number"],
    },
  },

  hometown: { type: String, required: true },
  address: { type: String, required: true },
  ethnicity: { type: String, default: null },
  religion: { type: String, default: null },
  eduLevel: { type: String, default: null },
  joinDate: { type: Date, required: true },
  contact: { type: String, required: true },
  position: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "moved", "removed"],
    default: "active",
  },
 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", MemberSchema);
