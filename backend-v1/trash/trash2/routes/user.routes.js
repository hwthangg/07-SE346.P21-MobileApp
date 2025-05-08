import express from "express";
import UserController from "../controllers/user.controller.js"


const UserRoutes = express.Router();

UserRoutes.post("/", UserController.createUser)
UserRoutes.get("/:userId", UserController.retrieveOneUser)
UserRoutes.get("/", UserController.retrieveManyUsers)
UserRoutes.put("/:userId", UserController.updateUser)
UserRoutes.delete("/:userId", UserController.deleteUser)
UserRoutes.patch("/:userId/:chapterId", UserController.setUserChapterId)

export default UserRoutes;
