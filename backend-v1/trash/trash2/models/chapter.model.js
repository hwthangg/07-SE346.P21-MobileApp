import mongoose, { Schema } from "mongoose";

const chapterSchema = new Schema(
  {
    address: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    
    affiliated: {
      type: String,
      required: true,
    },
    establishedDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Activated", "Deleted"],
      default: "Activated", // Mặc định là Activated
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt khi sử dụng timestamps
);

const Chapter = mongoose.model("Chapter", chapterSchema, "chapter_collection");

export default Chapter;
