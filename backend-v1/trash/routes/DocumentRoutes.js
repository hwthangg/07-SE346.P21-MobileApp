const express = require('express');
const documentController = require('../controllers/DocumentController.js');

const router = express.Router();

// Create a new document
router.post('/', documentController.createDocument);

// Get all documents
router.get('/', documentController.getDocuments);

// Get a single document by ID
router.get('/:id', documentController.getDocumentById);

// Update a document
router.put('/:id', documentController.updateDocument);

// Delete a document
router.delete('/:id', documentController.deleteDocument);

module.exports = router;