const ChapterServiceInterface = require("./interfaces/chapterServiceInterface");

class ChapterService extends ChapterServiceInterface {
  constructor(chapterRepository) {
    super();
    this.chapterRepository = chapterRepository;
  }

  async getAllChapters() {
    return await this.chapterRepository.getAll();
  }

  async getChapterById(id) {
    const chapter = await this.chapterRepository.getById(id);
    if (!chapter) throw new Error("Chapter not found");
    return chapter;
  }

  async createChapter(data) {
    return await this.chapterRepository.create(data);
  }

  async updateChapter(id, data) {
    const chapter = await this.chapterRepository.update(id, data);
    if (!chapter) throw new Error("Chapter not found");
    return chapter;
  }

  async deleteChapter(id) {
    const chapter = await this.chapterRepository.delete(id);
    if (!chapter) throw new Error("Chapter not found");
    return chapter;
  }
}

module.exports = ChapterService;
