const express = require('express');
const router = express.Router();
const participationController = require('../controllers/ParticipationController.js');

// Tạo mới lượt tham gia
router.post('/', participationController.createParticipation);

// Lấy tất cả lượt tham gia
router.get('/', participationController.getParticipations);

// Lấy thông tin một lượt tham gia theo ID
router.get('/:id', participationController.getParticipationById);

// Cập nhật thông tin lượt tham gia
router.put('/:id', participationController.updateParticipation);

// Xóa một lượt tham gia
router.delete('/:id', participationController.deleteParticipation);

module.exports = router;
