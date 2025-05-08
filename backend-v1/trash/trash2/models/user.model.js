import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,

    },
    phone: {
      type: String,
      required: true,

    },
    fullname: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"], // Các giá trị hợp lệ cho giới tính
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Leader"], // Các vai trò hợp lệ
      required: true,
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter", // Mô hình 'Chapter' để liên kết với chi đoàn
      default: null,
    },
    status: {
      type: String,
      enum: ["Activated", "Deleted"], // Các trạng thái hợp lệ
      default: "Activated", // Mặc định là Activated
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt khi sử dụng timestamps
);

const User = mongoose.model("User", userSchema, "user_collection");

export default User;
