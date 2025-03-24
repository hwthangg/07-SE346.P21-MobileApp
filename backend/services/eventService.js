const eventRepository = require('../repositories/eventRepository');

// Lấy danh sách tất cả sự kiện
const getAllEvents = async () => {
    const events = await eventRepository.findAll();

    // Loại bỏ các trường có giá trị null
    return events.map(event => {
        const eventObject = event.toObject();
        Object.keys(eventObject).forEach(key => {
            if (eventObject[key] === null) {
                delete eventObject[key];
            }
        });
        return eventObject;
    });
};

// Lấy chi tiết sự kiện theo ID
const getEventById = async (id) => {
    const event = await eventRepository.findById(id);

    if (!event) return null;

    // Loại bỏ các trường có giá trị null
    const eventObject = event.toObject();
    Object.keys(eventObject).forEach(key => {
        if (eventObject[key] === null) {
            delete eventObject[key];
        }
    });

    return eventObject;
};

// Tìm kiếm sự kiện theo tên
const searchEventsByName = async (name) => {
    const events = await eventRepository.findByName(name);

    // Loại bỏ các trường có giá trị null
    return events.map(event => {
        const eventObject = event.toObject();
        Object.keys(eventObject).forEach(key => {
            if (eventObject[key] === null) {
                delete eventObject[key];
            }
        });
        return eventObject;
    });
};

// Tạo sự kiện mới
const createEvent = async (eventData) => {
    return await eventRepository.create(eventData);
};

// Sửa sự kiện
const updateEvent = async (id, eventData) => {
    return await eventRepository.update(id, eventData);
};

// Xóa sự kiện
const deleteEvent = async (id) => {
    return await eventRepository.delete(id);
};

module.exports = {
    getAllEvents,
    getEventById,
    searchEventsByName,
    createEvent,
    updateEvent,
    deleteEvent,
};