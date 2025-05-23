import { Document, Chapter, Account } from "../models/index.js";
import { response, verifyToken } from "../utils/index.js";

const DocumentController = () => {
  /**
   * Create new document
   * POST /documents
   * Request body: { chapterId, docId, name, type, scope, issuer, issuedDate, description, file }
   */
  const createDocument = async (req, res) => {
    const logPrefix = "[DocumentController][createDocument]";
    console.log(`${logPrefix} Start with data:`, req.file);

    try {
      const input = req.body;
      
      const decode = verifyToken(req.cookies.token)
      const accountId = decode.id
      const account = await Account.findById(accountId)
      const chapterId = account.managerOf

      if (
        !input.docId        ||
        !input.name         ||
        !input.issuer       ||
        !input.issuedAt     ||
        !input.description  ||
        !req.file.path      
 

      ) {
        return response(res, 400, "MISSING_CHAPTER_DATA");
      }

      if(req.file.mimetype != 'application/pdf'){
 return response(res, 400, "ERROR_FORMAT_DOCUMENT");
      }
      // Check for duplicate docId within the same chapter
      const existingDoc = await Document.findOne({ 
        chapterId: chapterId,
        docId: input.docId 
      });
      if (existingDoc) {
        console.warn(`${logPrefix} Document ID ${input.docId} already exists in this chapter`);
        return response(res, 409, "DOCUMENT_ID_EXISTS");
      }

      // Create new document
      const newDocument = new Document({
        chapterId: chapterId,
        docId: input.docId,
        name: input.name,
        type: input.type || 'Khác',
        scope: input.scope || 'chapter',
        issuer: input.issuer,
        issuedAt: new Date(input.issuedAt),
        description: input.description,
        file: req.file.path
      });

      const savedDocument = await newDocument.save();
      console.log(`${logPrefix} Document created successfully`, savedDocument._id);
      
      return response(res, 201, "DOCUMENT_CREATED", savedDocument);

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Get paginated documents with chapter info
   * GET /documents?page=1&limit=10&chapterId=...&search=...&type=...&scope=...&status=...&sortBy=...&sortOrder=...
   */
 const getDocumentsInPage = async (req, res) => {
  const logPrefix = "[DocumentController][getDocumentsInPage]";
  console.log(`${logPrefix} Start with query:`, req.query);

  try {
    // Get user's chapter info from token
    const decode = verifyToken(req.cookies.token);
    const accountId = decode.id;
    const account = await Account.findById(accountId);
    
    const userChapterId = account.role == 'manager' ? account.managerOf : account.infoMember;
    const allowedScope = account.role == 'member' ? ['chapter'] : ['chapter', 'private']
    console.log(userChapterId, allowedScope, account, )
    const {
      page = 1,
      limit = 10,
      search = "",
      type,
      scope,
      sortBy = "_id",
      sortOrder = "asc",
    } = req.query;

    // Build filter to get:
    // 1. All public documents (scope = 'public') OR
    // 2. Documents from user's chapter (chapterId = userChapterId)
    const filter = {
      $or: [
        { scope: {$in: allowedScope} },
        { chapterId: userChapterId }
      ]
    };

    // Additional filters
    if (search) {
      filter.$and = [{
        $or: [
          { name: { $regex: search, $options: "i" } },
          { docId: { $regex: search, $options: "i" } },
          { issuer: { $regex: search, $options: "i" } },
        ]
      }];
    }

    if (type) filter.type = type;
    if (scope) filter.type = scope;
   filter.status = 'active';

    // Pagination options
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
      select: "_id docId name scope type issuer issuedAt",
      lean: true
    };

    // Execute query
    const result = await Document.paginate(filter, options);
    console.log(`${logPrefix} Found ${result.docs.length} documents`);

    return response(res, 200, "DOCUMENTS_FETCHED", {
      documents: result.docs,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.totalDocs,
        itemsPerPage: result.limit
      }
    });

  } catch (error) {
    console.error(`${logPrefix} Error:`, error);
    return response(res, 500, "SERVER_ERROR");
  }
};
  /**
   * Get document by ID with chapter info
   * GET /documents/:documentId
   */
  const getDocumentById = async (req, res) => {
    const logPrefix = "[DocumentController][getDocumentById]";
    console.log(`${logPrefix} Request for document:`, req.params.documentId);

    try {
      const document = await Document.findById(req.params.documentId)
        .populate('chapterId', '_id name');

      if (!document) {
        console.warn(`${logPrefix} Document not found`);
        return response(res, 404, "DOCUMENT_NOT_FOUND");
      }

      console.log(`${logPrefix} Document found`);
      return response(res, 200, "DOCUMENT_FETCHED", document);

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Update document
   * PUT /documents/:documentId
   */
  const updateDocumentById = async (req, res) => {
    const logPrefix = "[DocumentController][updateDocumentById]";
    console.log(`${logPrefix} Start update for:`, req.params.documentId, req.body, req.file);

       try {
      const input = req.body;
      
      const decode = verifyToken(req.cookies.token)
      const accountId = decode.id
      const account = await Account.findById(accountId)
      const chapterId = account.managerOf

      if (
        !input.docId        ||
        !input.name         ||
        !input.issuer       ||
        !input.issuedAt     ||
        !input.description    
 

      ) {
        return response(res, 400, "MISSING_CHAPTER_DATA");
      }


      if(req.file &&  req.file.mimetype != 'application/pdf'){
 return response(res, 400, "ERROR_FORMAT_DOCUMENT");
      }
      // Check for duplicate docId within the same chapter
      const existingDoc = await Document.findOne({ 
        chapterId: chapterId,
        docId: input.docId 
      });
      if (existingDoc && existingDoc._id.toString() != req.params.documentId.toString()) {
        console.warn(`${logPrefix} Document ID ${input.docId} already exists in this chapter`);
        return response(res, 409, "DOCUMENT_ID_EXISTS");
      }

      // Create new document
      const updatingDocument = new Document({
        chapterId: chapterId,
        docId: input.docId,
        name: input.name,
        type: input.type || 'Khác',
        scope: input.scope || 'chapter',
        issuer: input.issuer,
        issuedAt: new Date(input.issuedAt),
        description: input.description,
      });

      if(req.file){
        updatingDocument.file = req.file.path
      }

      updatingDocument._id = req.params.documentId

      const savedDocument = await updatingDocument.save()

      
      console.log(`${logPrefix} Document created successfully`, savedDocument._id);
      
      return response(res, 201, "DOCUMENT_CREATED", savedDocument);

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Change document status
   * PATCH /documents/:documentId/status
   */
  const changeDocumentStatus = async (req, res) => {
    const logPrefix = "[DocumentController][changeDocumentStatus]";
    console.log(`${logPrefix} Request:`, req.params, req.body);

    try {
      const { documentId } = req.params;
      const { status } = req.body;

      // Validate status
      const validStatuses = ['active', 'deleted'];
      if (!validStatuses.includes(status)) {
        console.warn(`${logPrefix} Invalid status: ${status}`);
        return response(res, 400, "INVALID_STATUS", { validStatuses });
      }

      // Find document
      const document = await Document.findById(documentId);
      if (!document) {
        console.warn(`${logPrefix} Document not found`);
        return response(res, 404, "DOCUMENT_NOT_FOUND");
      }

      // Update status
      const previousStatus = document.status;
      document.status = status;
      await document.save();

      console.log(`${logPrefix} Status changed from ${previousStatus} to ${status}`);
      return response(res, 200, "STATUS_UPDATED", {
        previousStatus,
        newStatus: status,
        updatedAt: document.updatedAt
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
    createDocument,
    getDocumentsInPage,
    getDocumentById,
    updateDocumentById,
    changeDocumentStatus
  };
};

export default DocumentController();