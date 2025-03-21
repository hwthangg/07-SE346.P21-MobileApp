const DocumentServiceInterface = require('./interfaces/documentServiceInterface')

class DocumentService extends DocumentServiceInterface {
  constructor (documentRepository) {
    super()
    this.documentRepository = documentRepository
  }

  async getAllDocuments () {
    return await this.documentRepository.getAll()
  }

  async getDocumentById (id) {
    const document = await this.documentRepository.getById(id)
    if (!document) throw new Error('Document not found')
    return document
  }

  async createDocument (data) {
    return await this.documentRepository.create(data)
  }

  async updateDocument (id, data) {
    const document = await this.documentRepository.update(id, data)
    if (!document) throw new Error('Document not found')
    return document
  }

  async deleteDocument (id) {
    const document = await this.documentRepository.delete(id)
    if (!document) throw new Error('Document not found')
    return document
  }
}

module.exports = DocumentService
