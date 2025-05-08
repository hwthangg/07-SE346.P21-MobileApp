const TransferLog = require('../models/TransferLogModel');

// Tạo mới một bản ghi chuyển sinh hoạt
exports.createTransferLog = async (req, res) => {
    try {
        const newTransferLog = new TransferLog(req.body);
        await newTransferLog.save();
        res.status(201).json(newTransferLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy tất cả các bản ghi chuyển sinh hoạt
exports.getTransferLogs = async (req, res) => {
    try {
        const transferLogs = await TransferLog.find();
        res.status(200).json(transferLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy một bản ghi chuyển sinh hoạt theo ID
exports.getTransferLogById = async (req, res) => {
    try {
        const transferLog = await TransferLog.findById(req.params.id);
        if (!transferLog) {
            return res.status(404).json({ message: 'Transfer log not found' });
        }
        res.status(200).json(transferLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật một bản ghi chuyển sinh hoạt
exports.updateTransferLog = async (req, res) => {
    try {
        const updatedTransferLog = await TransferLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTransferLog) {
            return res.status(404).json({ message: 'Transfer log not found' });
        }
        res.status(200).json(updatedTransferLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa một bản ghi chuyển sinh hoạt
exports.deleteTransferLog = async (req, res) => {
    try {
        const deletedTransferLog = await TransferLog.findByIdAndDelete(req.params.id);
        if (!deletedTransferLog) {
            return res.status(404).json({ message: 'Transfer log not found' });
        }
        res.status(200).json({ message: 'Transfer log deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};