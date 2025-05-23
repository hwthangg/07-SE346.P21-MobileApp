import express from "express";
import { DocumentController } from "../controllers/index.js";
import uploadSingle from "../middlewares/uploadSingle.js";

const DocumentRoutes = express.Router();

DocumentRoutes.post("/",uploadSingle('file'), DocumentController.createDocument);
DocumentRoutes.get("/", DocumentController.getDocumentsInPage);
DocumentRoutes.get("/:documentId", DocumentController.getDocumentById);
DocumentRoutes.put("/:documentId",uploadSingle('file'), DocumentController.updateDocumentById);
DocumentRoutes.patch("/:documentId", DocumentController.changeDocumentStatus);

export default DocumentRoutes;
