const express = require('express')
const router = express.Router()
const DocumentRepository = require('../repositories/documentRepository')
const DocumentService = require('../services/documentService')
const DocumentController = require('../controllers/documentController')

// Dependency Injection
const documentRepository = new DocumentRepository()
const documentService = new DocumentService(documentRepository)
const documentController = new DocumentController(documentService)

router.get(
  '/documents',
  documentController.getAllDocuments.bind(documentController)
)
router.get(
  '/documents/:id',
  documentController.getDocumentById.bind(documentController)
)
router.post(
  '/documents',
  documentController.createDocument.bind(documentController)
)
router.put(
  '/documents/:id',
  documentController.updateDocument.bind(documentController)
)
router.delete(
  '/documents/:id',
  documentController.deleteDocument.bind(documentController)
)

module.exports = router
