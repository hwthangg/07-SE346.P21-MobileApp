const express = require('express');
const chapterController = require('../controllers/ChapterController.js');

const router = express.Router();

// Create a new chapter
router.post('/', chapterController.createChapter);

// Get all chapters
router.get('/', chapterController.getChapters);

// Get a single chapter by ID
router.get('/:id', chapterController.getChapterById);

// Update a chapter
router.put('/:id', chapterController.updateChapter);

// Delete a chapter
router.delete('/:id', chapterController.deleteChapter);

module.exports = router;
