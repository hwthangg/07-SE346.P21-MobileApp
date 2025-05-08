const Participation = require('../models/ParticipationModel.js');

// Tạo mới một lượt tham gia
exports.createParticipation = async (req, res) => {
    try {
        const newParticipation = new Participation(req.body);
        await newParticipation.save();
        res.status(201).json(newParticipation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy tất cả lượt tham gia
exports.getParticipations = async (req, res) => {
    try {
        const participations = await Participation.find();
        res.status(200).json(participations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy một lượt tham gia theo ID
exports.getParticipationById = async (req, res) => {
    try {
        const participation = await Participation.findById(req.params.id);
        if (!participation) {
            return res.status(404).json({ message: 'Participation not found' });
        }
        res.status(200).json(participation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật thông tin lượt tham gia
exports.updateParticipation = async (req, res) => {
    try {
        const updatedParticipation = await Participation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedParticipation) {
            return res.status(404).json({ message: 'Participation not found' });
        }
        res.status(200).json(updatedParticipation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa một lượt tham gia
exports.deleteParticipation = async (req, res) => {
    try {
        const deletedParticipation = await Participation.findByIdAndDelete(req.params.id);
        if (!deletedParticipation) {
            return res.status(404).json({ message: 'Participation not found' });
        }
        res.status(200).json({ message: 'Participation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};