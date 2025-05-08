import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    fullname: { type: String, required: true },
    birthday: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "leader"],
      required: true,
      default: "leader",
    },
    status: {
      type: String,
      enum: ["activated", "deleted"],
      default: "activated",
    },
    chapterId: { type: mongoose.Types.ObjectId, ref: "Chapter", default: null }, //Kiểu ObjectId của MongoDB
  },
  { timestamps: true } //Tự động tạo createdAt, updatedAt
);

const User = mongoose.model("User", UserSchema, "user_collection");
export default User;
