const Event = require('../models/eventModel');

// Lấy tất cả sự kiện
const findAll = async () => {
    return await Event.find();
};

// Tìm sự kiện theo ID
const findById = async (id) => {
    return await Event.findById(id);
};

// Tìm kiếm sự kiện theo tên
const findByName = async (name) => {
    return await Event.find({ title: { $regex: name, $options: 'i' } }); // Tìm kiếm không phân biệt hoa thường
};

// Tạo sự kiện mới
const create = async (eventData) => {
    const event = new Event(eventData);
    return await event.save();
};

// Sửa sự kiện
const update = async (id, eventData) => {
    return await Event.findByIdAndUpdate(id, eventData, { new: true });
};

// Xóa sự kiện
const deleteEvent = async (id) => {
    return await Event.findByIdAndDelete(id);
};

module.exports = {
    findAll,
    findById,
    findByName,
    create,
    update,
    delete: deleteEvent,
};