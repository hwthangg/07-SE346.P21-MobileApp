import { Account, Chapter, Document, Event, Member } from "../models/index.js";
import { response, validateChapter } from "../utils/index.js";

const ChapterController = () => {

  const createChapter = async (req, res) => {
    const logPrefix = "[ChapterController][createChapter]";
    console.log(`${logPrefix} Start with data:`, req.body);

    try {
      const input = req.body.chapter;

       if (
        !input.name ||
        !input.affiliated ||
        !input.address ||
        !input.establishedAt

      ) {
        return response(res, 400, "MISSING_CHAPTER_DATA");
      }
    // Kiểm tra chi đoàn đã tồn tại chưa
      const existingChapter = await Chapter.findOne({ name: input.name, affiliated:input.affiliated, address:input.address });
      if (existingChapter) {
        console.warn(`${logPrefix} Validation failed: Chapter has existed`);
        return response(res, 400, "INVALID_CHAPTER_DATA");
      }
      // Tạo chapter
      const chapter = new Chapter({
        name: input.name,
        affiliated: input.affiliated,
        address: input.address,
        establishedAt: input.establishedAt
      });

      const savedChapter = await chapter.save();
      console.log(`${logPrefix} Chapter created successfully`, savedChapter._id);

      return response(res, 201, "CHAPTER_CREATED", savedChapter);

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
        return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Lấy danh sách chapter phân trang
   * Endpoint: GET /chapters?page=1&limit=10&search=...&status=...&sortBy=...&sortOrder=...
   */
  const getChaptersInPage = async (req, res) => {
    const logPrefix = "[ChapterController][getChaptersInPage]";
    console.log(`${logPrefix} Start with query:`, req.query);

    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        status,
        sortBy = "createdAt",
        sortOrder = "asc",
      } = req.query;

      // Build filter
      const filter = {};
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { affiliated: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } }
        ];
      }

      if (status) filter.status = status;

      // Pagination options
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { [sortBy]: sortOrder === "asc" ? -1 : 1 },
        select: "_id"
        
      };

      // Execute query
      const chapters = await Chapter.paginate(filter, options);
      console.log(chapters)

      const result = await Account.find({managerOf:{$in: chapters.docs }}).populate('managerOf')
      .select('-status -email -phone -password -avatar -birthday -gender -role -infoMember')
      return response(res, 200, "CHAPTERS_FETCHED", {
        chapters: result,
        pagination: {
          currentPage: chapters.page,
          totalPages: chapters.totalPages,
          totalItems: chapters.totalDocs,
          itemsPerPage: chapters.limit
        }
      });

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

 
  const getChapterById = async (req, res) => {
    const logPrefix = "[ChapterController][getChapterById]";
    console.log(`${logPrefix} Request for chapter:`, req.params.chapterId);

    try {
      const chapter = await Chapter.findById(req.params.chapterId);
      const documents = await Document.find({chapterId: chapter._id})
      const events = await Event.find({chapterId: chapter._id})
      const members = await Member.find({chapterId: chapter._id})
      console.log(documents)
      if (!chapter) {
        console.warn(`${logPrefix} Chapter not found`);
        return response(res, 404, "CHAPTER_NOT_FOUND");
      }

      console.log(`${logPrefix} Chapter found`);
      return response(res, 200, "CHAPTER_FETCHED", {
        general: chapter,
        documents: documents,
        events: events,
        members: members
      });

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      if (error.name === 'CastError') {
        return response(res, 400, "INVALID_ID");
      }

      return response(res, 500, "SERVER_ERROR");
    }
  };


  const updateChapterById = async (req, res) => {
    const logPrefix = "[ChapterController][updateChapterById]";
    console.log(`${logPrefix} Start update for:`, req.params.chapterId);

  try {
      const input = req.body.chapter;
      const chapterId = req.params.chapterId

      console.log(input)

       if (
        !input.name ||
        !input.affiliated ||
        !input.address ||
        !input.establishedAt

      ) {
        return response(res, 400, "MISSING_CHAPTER_DATA");
      }

      const currentChapter = await Chapter.findById(chapterId)

    // Kiểm tra chi đoàn đã tồn tại chưa
      const existingChapter = await Chapter.findOne({ name: input.name, affiliated:input.affiliated, address:input.address });
      console.log(existingChapter)
      if (existingChapter && existingChapter._id.toString()!= chapterId.toString()) {
        console.warn(`${logPrefix} Validation failed: Chapter has existed`);
        return response(res, 400, "INVALID_CHAPTER_DATA");
      }
      // Tạo chapter
      const updatingChapter = new Chapter({
        name: input.name,
        affiliated: input.affiliated,
        address: input.address,
        establishedAt: input.establishedAt
      });

      const allowedFields = ["name", "affiliated", "address", "establishedAt"]

      for(const field of allowedFields){
        currentChapter[field] = updatingChapter[field]
      }
      const savedChapter = await currentChapter.save();
      console.log(`${logPrefix} Chapter created successfully`, savedChapter._id);

      return response(res, 201, "CHAPTER_CREATED", savedChapter);

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
        return response(res, 500, "SERVER_ERROR");
    }
  };


  const changeChapterStatus = async (req, res) => {
    const logPrefix = "[ChapterController][changeChapterStatus]";
    console.log(`${logPrefix} Request:`, req.params, req.body);

    try {
      const { chapterId } = req.params;
      const { status } = req.body;

      // Validate status
      const validStatuses = ['active', 'banned'];
      if (!validStatuses.includes(status)) {
        console.warn(`${logPrefix} Invalid status: ${status}`);
        return response(res, 400, "INVALID_STATUS", { validStatuses });
      }

      // Find chapter
      const chapter = await Chapter.findById(chapterId);
      if (!chapter) {
        console.warn(`${logPrefix} Chapter not found`);
        return response(res, 404, "CHAPTER_NOT_FOUND");
      }

      // Check if status changed
      if (chapter.status === status) {
        console.log(`${logPrefix} Status not changed`);
        return response(res, 200, "STATUS_UNCHANGED");
      }

      // Update status
      const previousStatus = chapter.status;
      chapter.status = status;
      await chapter.save();

      console.log(`${logPrefix} Status changed from ${previousStatus} to ${status}`);
      return response(res, 200, "STATUS_UPDATED", {
        previousStatus,
        newStatus: status
      });

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      if (error.name === 'CastError') {
        return response(res, 400, "INVALID_ID");
      }

      return response(res, 500, "SERVER_ERROR");
    }
  };

  return {
    createChapter,
    getChaptersInPage,
    getChapterById,
    updateChapterById,
    changeChapterStatus
  };
};

export default ChapterController();