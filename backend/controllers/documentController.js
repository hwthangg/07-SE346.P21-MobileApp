class DocumentController {
  constructor (documentService) {
    this.documentService = documentService
  }

  async getAllDocuments (req, res) {
    try {
      const documents = await this.documentService.getAllDocuments()
      res.status(200).json(documents)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async getDocumentById (req, res) {
    try {
      const document = await this.documentService.getDocumentById(req.params.id)
      res.status(200).json(document)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }

  async createDocument (req, res) {
    try {
      const document = await this.documentService.createDocument(req.body)
      res.status(201).json(document)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  async updateDocument (req, res) {
    try {
      const document = await this.documentService.updateDocument(
        req.params.id,
        req.body
      )
      res.status(200).json(document)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  async deleteDocument (req, res) {
    try {
      await this.documentService.deleteDocument(req.params.id)
      res.status(200).json({ message: 'Document deleted' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
}

module.exports = DocumentController
