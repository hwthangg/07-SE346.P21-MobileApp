import express from "express";
import { EventController } from "../controllers/index.js";
import uploadMultiple from "../middlewares/uploadMultiple.js";

const EventRoutes = express.Router();

EventRoutes.post("/", uploadMultiple('images'), EventController.createEvent);
EventRoutes.get("/", EventController.getEventsInPage);
EventRoutes.get("/:eventId", EventController.getEventById);
EventRoutes.put("/:eventId",uploadMultiple('images'), EventController.updateEventById);
EventRoutes.patch("/:eventId", EventController.changeEventStatus);
EventRoutes.patch("/:eventId/like", EventController.likeEvent);
EventRoutes.post("/:eventId/register", EventController.registerEvent);
EventRoutes.get("/:eventId/register", EventController.getRegistrationsInPage);
EventRoutes.patch("/:eventId/register/:registerId", EventController.checkin);
EventRoutes.post("/:eventId/comments", EventController.postComment);
EventRoutes.get("/:eventId/comments", EventController.getComments);
EventRoutes.patch("/:eventId/comments/:commentId", EventController.changeCommentStatus);

export default EventRoutes;
