import Document from "../models/document.model.js";

const DocumentController = () => {
  // Create new document
  const createDocument = async (req, res) => {
    try {
      const input = req.body;
      const chapterId = req.cookies.chapterId;

      const newDocument = new Document({
        ...input,
        chapterId
      });

      await newDocument.save();

      res.status(201).send({
        status: "success",
        message: "Document created successfully",
        data: { document: newDocument }
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // Get all documents by filter (e.g., type or status)
  const getAllDocumentsWithFilter = async (req, res) => {
    try {
      const chapterId = req.cookies.chapterId;
      const filters = { ...req.query, chapterId };

      const documents = await Document.find(filters);

      if (documents.length === 0) {
        return res.status(404).send({
          status: "error",
          message: "No documents found"
        });
      }

      res.status(200).send({
        status: "success",
        message: "Documents retrieved successfully",
        data: { documents }
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // Get a document by ID
  const getDocumentById = async (req, res) => {
    try {
      const chapterId = req.cookies.chapterId;
      const documentId = req.params.documentId;

      const document = await Document.findById(documentId);

      if (!document || document.chapterId.toString() !== chapterId) {
        return res.status(404).send({
          status: "error",
          message: "Document not found"
        });
      }

      res.status(200).send({
        status: "success",
        message: "Document retrieved successfully",
        data: { document }
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // Update a document by ID
  const updateDocumentById = async (req, res) => {
    try {
      const documentId = req.params.documentId;
      const updateData = req.body;
      const chapterId = req.cookies.chapterId;

      const document = await Document.findById(documentId);

      if (!document || document.chapterId.toString() !== chapterId) {
        return res.status(404).send({
          status: "error",
          message: "Document not found or not accessible"
        });
      }

      // Cập nhật thủ công và gọi save()
      Object.assign(document, updateData);
      document.updatedAt = new Date();
      await document.save();

      res.status(200).send({
        status: "success",
        message: "Document updated successfully",
        data: { document }
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // Soft delete a document by ID
  const deleteDocumentById = async (req, res) => {
    try {
      const documentId = req.params.documentId;
      const chapterId = req.cookies.chapterId;

      const document = await Document.findById(documentId);

      if (!document || document.chapterId.toString() !== chapterId) {
        return res.status(404).send({
          status: "error",
          message: "Document not found or not accessible"
        });
      }

      document.status = "deleted";
      document.updatedAt = new Date();
      await document.save();

      res.status(200).send({
        status: "success",
        message: "Document deleted successfully",
        data: { document }
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  return {
    createDocument,
    getAllDocumentsWithFilter,
    getDocumentById,
    updateDocumentById,
    deleteDocumentById
  };
};

export default DocumentController();
