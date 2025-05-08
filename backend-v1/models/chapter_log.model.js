import mongoose, { Schema } from "mongoose";

const ChapterLogSchema = new Schema({
    chapterId: {type: mongoose.Types.ObjectId, ref:"Chapter", required: true},
    log: {type:String, required: true},
    createdAt: {type: Date, default: Date.now()}
})

const ChapterLog =mongoose.model("ChapterLog", ChapterLogSchema, "chapter_log_collection")
export default ChapterLog