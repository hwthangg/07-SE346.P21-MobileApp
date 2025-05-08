import mongoose from "mongoose";
import Chapter from "../models/chapter.model.js";
import ChapterLog from "../models/chapter_log.model.js";

const ChapterController = () => {
  const createChapter = async (req, res) => {
    try {
      const chapterData = req.body;
      const existingChapter = await Chapter.findOne({
        address: chapterData.address,
      });
      if (existingChapter) {
        return res.status(409).send("Address is already in use");
      }
      const newChapter = await new Chapter(chapterData).save();

      return res.status(201).send(newChapter);
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  const retrieveOneChapter = async (req, res) => {
    try {
      const { chapterId } = req.params;
      const chapter = await Chapter.findById(chapterId);
      if (chapter) {
        return res.status(200).send(chapter);
      } else {
        return res.status(404).send("Chapter not found");
      }
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  const retrieveManyChapters = async (req, res) => {
    try {
      const filter = req.query;
      const chapters = await Chapter.find(filter);
      if (chapters.length > 0) {
        return res.status(200).send(chapters);
      } else {
        return res.status(404).send({ message: "No chapters found" });
      }
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  const updateChapter = async (req, res) => {
    try {
      const { chapterId } = req.params;
      const chapterData = req.body;
      const existingChapter = await Chapter.findOne({
        address: chapterData.address,
      });
      if (existingChapter) {
        return res.status(409).send("Address is already in use");
      }
      const updatedChapter = await Chapter.findByIdAndUpdate(chapterId, chapterData, {
        new: true,
      });
      if (updatedChapter) {
        return res.send(updatedChapter);
      } else {
        return res.status(404).send("Chapter not found");
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  const deleteChapter = async (req, res) => {
    try {
      const { chapterId } = req.params;
      const logs = await ChapterLog.findByIdAndDelete(chapterId);
      if (logs.length > 0) {
        return res.send(deletedChapter);
      } else {
        return res.status(404).send("Chapter logs not found");
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  };
const retrieveChapterLogs =async(req, res) => {
  try {
    const chapterId = req.params.chapterId
    const logs = await ChapterLog.find({chapterId: chapterId});
  

  
    if (logs.length > 0) {
      return res.send(logs);
    } else {
      return res.status(404).send("No chapter logs found");
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
}
  return {
    createChapter,
    retrieveOneChapter,
    retrieveManyChapters,
    updateChapter,
    deleteChapter,
    retrieveChapterLogs
  };
};

export default ChapterController();
