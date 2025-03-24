const eventService = require('../services/eventService');

// Lấy danh sách tất cả các sự kiện
const getEvents = async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

// Lấy chi tiết một sự kiện
const getEventById = async (req, res) => {
    try {
        const event = await eventService.getEventById(req.params.id);

        if (!event) return res.status(404).json({ message: 'Event not found' });

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error });
    }
};

// Tìm kiếm sự kiện theo tên
const searchEventsByName = async (req, res) => {
    try {
        const events = await eventService.searchEventsByName(req.query.name);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error searching events', error });
    }
};

// Tạo một sự kiện mới
const createEvent = async (req, res) => {
    try {
        const newEvent = await eventService.createEvent(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: 'Error creating event', error });
    }
};

// Sửa một sự kiện
const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await eventService.updateEvent(req.params.id, req.body);

        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: 'Error updating event', error });
    }
};

// Xóa một sự kiện
const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await eventService.deleteEvent(req.params.id);

        if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
};

module.exports = {
    getEvents,
    getEventById,
    searchEventsByName,
    createEvent,
    updateEvent,
    deleteEvent,
};