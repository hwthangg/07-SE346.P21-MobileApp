const express = require("express");
const router = express.Router();
const ChapterRepository = require("../repositories/chapterRepository");
const ChapterService = require("../services/chapterService");
const ChapterController = require("../controllers/chapterController");

// Dependency Injection
const chapterRepository = new ChapterRepository();
const chapterService = new ChapterService(chapterRepository);
const chapterController = new ChapterController(chapterService);

router.get("/chapters", chapterController.getAllChapters.bind(chapterController));
router.get("/chapters/:id", chapterController.getChapterById.bind(chapterController));
router.post("/chapters", chapterController.createChapter.bind(chapterController));
router.put("/chapters/:id", chapterController.updateChapter.bind(chapterController));
router.delete("/chapters/:id", chapterController.deleteChapter.bind(chapterController));

module.exports = router;
