import express from "express";
import EventController from "../controllers/event.controller.js";

const EventRoutes = express.Router();

// Tạo sự kiện mới
EventRoutes.post("/", EventController.createEvent);

// Lấy danh sách sự kiện với filter (nếu có)
EventRoutes.get("/", EventController.getAllEventsWithFilter);

// Lấy thông tin sự kiện theo ID
EventRoutes.get("/:eventId", EventController.getEventById);

// Cập nhật sự kiện theo ID
EventRoutes.put("/:eventId", EventController.updateEventById);

// Xoá mềm sự kiện theo ID
EventRoutes.delete("/:eventId", EventController.deleteEventById);

// Điểm danh đoàn viên
EventRoutes.post("/:eventId/check-in", EventController.checkinEvent)

//Like sự kiện
EventRoutes.post("/:eventId/like", EventController.likeEvent)

export default EventRoutes;
