import mongoose, { Schema } from "mongoose";

const ChapterSchema = new Schema({
    name: {type: String, required:true},
    address: {type: String, required: true},
    affiliated: {type: String, required:true},
    establishedDate: {type:Date, required:true},
    status: {type: String, enum:["activated","deleted"], default: "activated"}
},{timestamps:true})

const Chapter = mongoose.model("Chapter", ChapterSchema, "chapter_collection")

export default Chapter