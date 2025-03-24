const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true }, // Tiêu đề (bắt buộc)
        description: { type: String, trim: true, default: null }, // Mô tả (có thể null)
        images: [{ type: String, trim: true, default: null }], // Hình ảnh (mảng URL, có thể null)
        location: { type: String, trim: true, default: null }, // Vị trí (có thể null)
        time: { type: Date, required: true }, // Thời gian diễn ra (bắt buộc)
        requirements: { type: String, trim: true, default: null }, // Yêu cầu tham gia (có thể null)
        participants: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // ID đoàn viên (có thể null)
            },
        ], // Danh sách đoàn viên tham gia (có thể null)
        likes: { type: Number, default: 0, min: 0 }, // Số lượt yêu thích (mặc định là 0)
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true }, // Mã chi đoàn tạo sự kiện (bắt buộc)
        ownerName: { type: String, trim: true, default: null }, // Tên chi đoàn (có thể null)
        status: {
            type: String,
            enum: ["completed", "ongoing", "pending", "deleted"],
            default: "pending", // Trạng thái sự kiện (mặc định là "pending")
        }, // Trạng thái sự kiện
    },
    { timestamps: true } // Tự động tạo createdAt & updatedAt
);

module.exports = mongoose.model("Event", eventSchema);