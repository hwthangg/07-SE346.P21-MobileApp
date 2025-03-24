const express = require('express');
const {
    getEvents,
    getEventById,
    searchEventsByName,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventController');

const router = express.Router();

// Lấy danh sách sự kiện
router.get('/', getEvents);

// Tìm kiếm sự kiện theo tên
router.get('/search', searchEventsByName);

// Lấy chi tiết sự kiện
router.get('/:id', getEventById);

// Tạo sự kiện mới
router.post('/', createEvent);

// Sửa sự kiện
router.put('/:id', updateEvent);

// Xóa sự kiện
router.delete('/:id', deleteEvent);

module.exports = router;