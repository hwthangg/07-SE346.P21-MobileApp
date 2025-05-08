const express = require('express');
const router = express.Router();
const transferLogController = require('../controllers/TransferLogController');

// Tạo mới một bản ghi chuyển sinh hoạt
router.post('/', transferLogController.createTransferLog);

// Lấy tất cả các bản ghi chuyển sinh hoạt
router.get('/', transferLogController.getTransferLogs);

// Lấy một bản ghi chuyển sinh hoạt theo ID
router.get('/:id', transferLogController.getTransferLogById);

// Cập nhật một bản ghi chuyển sinh hoạt
router.put('/:id', transferLogController.updateTransferLog);

// Xóa một bản ghi chuyển sinh hoạt
router.delete('/:id', transferLogController.deleteTransferLog);

module.exports = router;
