import { config as configDotenv } from "dotenv";
// Load biến môi trường ngay sau khi import dotenv
configDotenv();

import mongoose from "mongoose";

const DB_CONNECT_STRING = process.env.DB_CONNECT_STRING;

export const connectDB = async () => {
  try {
    // Kết nối tới MongoDB với các tùy chọn mới
    await mongoose.connect(DB_CONNECT_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("💻 MongoDB Connected");
  } catch (err) {
    // Bắt và log lỗi nếu kết nối thất bại
    console.error("❌ MongoDB connection error:", err);
  }
};
