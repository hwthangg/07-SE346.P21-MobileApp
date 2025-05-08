const express = require('express');
const router = express.Router();
const chapterLogController = require('../controllers/ChapterLogController.js');

// Tạo mới một bản ghi thao tác
router.post('/', chapterLogController.createLog);

// Lấy tất cả các bản ghi thao tác
router.get('/', chapterLogController.getLogs);

// Lấy một bản ghi thao tác theo ID
router.get('/:id', chapterLogController.getLogById);

// Cập nhật một bản ghi thao tác
router.put('/:id', chapterLogController.updateLog);

// Xóa một bản ghi thao tác
router.delete('/:id', chapterLogController.deleteLog);

module.exports = router;