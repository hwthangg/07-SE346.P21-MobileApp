class ChapterController {
  constructor(chapterService) {
    this.chapterService = chapterService;
  }

  async getAllChapters(req, res) {
    try {
      const chapters = await this.chapterService.getAllChapters();
      res.status(200).json(chapters);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getChapterById(req, res) {
    try {
      const chapter = await this.chapterService.getChapterById(req.params.id);
      res.status(200).json(chapter);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async createDocument(req, res) {
    try {
      const document = await this.documentService.createDocument(req.body);
      res.status(201).json(document);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateChapter(req, res) {
    try {
      const chapter = await this.chapterService.updateChapter(
        req.params.id,
        req.body
      );
      res.status(200).json(document);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteChapter(req, res) {
    try {
      await this.chapterService.deleteChapter(req.params.id);
      res.status(200).json({ message: "Chapter deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = ChapterController;
