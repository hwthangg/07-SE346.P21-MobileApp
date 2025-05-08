import DocumentController from "../controllers/document.controller.js";
import express from "express";

const DocumentRoutes = express.Router();

// Tạo tài liệu mới
DocumentRoutes.post("/", DocumentController.createDocument);

// Lấy danh sách tài liệu (có filter)
DocumentRoutes.get("/", DocumentController.getAllDocumentsWithFilter);

// Lấy tài liệu theo ID
DocumentRoutes.get("/:documentId", DocumentController.getDocumentById);

// Cập nhật tài liệu theo ID
DocumentRoutes.put("/:documentId", DocumentController.updateDocumentById);

// Xoá mềm tài liệu theo ID
DocumentRoutes.delete("/:documentId", DocumentController.deleteDocumentById);

export default DocumentRoutes;
