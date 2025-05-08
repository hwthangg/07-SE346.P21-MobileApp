import mongoose, { Schema } from "mongoose";

const chapterLogSchema = new Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",  // Liên kết với collection 'Chapter'
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,  // Mặc định là thời gian hiện tại khi tạo bản ghi
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt khi sử dụng timestamps
);

const ChapterLog = mongoose.model("ChapterLog", chapterLogSchema, "chapter_log_collection");

export default ChapterLog;
