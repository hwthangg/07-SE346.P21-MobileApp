const Chapter = require("../models/chapterModel");
const ChapterRepositoryInterface = require("./interfaces/chapterRepositoryInterface");

class ChapterRepository extends ChapterRepositoryInterface {
  async getAll() {
    return await Chapter.find();
  }

  async getById(id) {
    return await Chapter.findById(id);
  }

  async create(data) {
    const chapter = new Chapter(data);
    return await chapter.save();
  }

  async update(id, data) {
    return await Chapter.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await Chapter.findByIdAndDelete(id);
  }
}

module.exports = ChapterRepository;
