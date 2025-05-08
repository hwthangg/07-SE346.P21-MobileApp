import express from "express";
import ChapterController from "../controllers/chapter.controller.js";

const ChapterRoutes = express.Router();

ChapterRoutes.post("/", ChapterController.createChapter);

ChapterRoutes.get("/:chapterId", ChapterController.retrieveOneChapter);

ChapterRoutes.get("/", ChapterController.retrieveManyChapters);

ChapterRoutes.put("/:chapterId", ChapterController.updateChapter);

ChapterRoutes.delete("/:chapterId", ChapterController.deleteChapter);

ChapterRoutes.get("/:chapterId/chapter-logs", ChapterController.retrieveChapterLogs);



export default ChapterRoutes;
