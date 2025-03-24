class ChapterServiceInterface {
  async getAllChapters() {
    throw new Error("Method getAllChapters() must be implemented");
  }
  async getChapterById(id) {
    throw new Error("Method getChapterById() must be implemented");
  }
  async createChapter(data) {
    throw new Error("Method createChapter() must be implemented");
  }
  async updateChapter(id, data) {
    throw new Error("Method updateChapter() must be implemented");
  }
  async deleteChapter(id) {
    throw new Error("Method deleteChapter() must be implemented");
  }
}

module.exports = ChapterServiceInterface;
