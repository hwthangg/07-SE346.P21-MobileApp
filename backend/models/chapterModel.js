const mongoose = require("mongoose");

const Member = require("./memberModel");
const Event = require("./eventModel");
const Document = require("./documentModel");

const ChapterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    affiliated: { type: String, required: true },
    createdDate: { type: Date, required: true },
    members: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: "Member", default: null },
            },
    ],
    events: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Event", default: null },
      },
    ],
    documents: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Document", default: null },
      },
    ],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", ChapterSchema);
