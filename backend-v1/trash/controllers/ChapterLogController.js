const ChapterLog = require('../models/ChapterLogModel');

// Tạo mới một bản ghi thao tác
exports.createLog = async (req, res) => {
    try {
        const newLog = new ChapterLog(req.body);
        await newLog.save();
        res.status(201).json(newLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy tất cả các bản ghi thao tác
exports.getLogs = async (req, res) => {
    try {
        const logs = await ChapterLog.find();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy một bản ghi thao tác theo ID
exports.getLogById = async (req, res) => {
    try {
        const log = await ChapterLog.findById(req.params.id);
        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }
        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật một bản ghi thao tác
exports.updateLog = async (req, res) => {
    try {
        const updatedLog = await ChapterLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLog) {
            return res.status(404).json({ message: 'Log not found' });
        }
        res.status(200).json(updatedLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa một bản ghi thao tác
exports.deleteLog = async (req, res) => {
    try {
        const deletedLog = await ChapterLog.findByIdAndDelete(req.params.id);
        if (!deletedLog) {
            return res.status(404).json({ message: 'Log not found' });
        }
        res.status(200).json({ message: 'Log deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
