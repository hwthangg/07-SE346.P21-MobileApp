class DocumentServiceInterface {
  async getAllDocuments () {
    throw new Error('Method getAllDocuments() must be implemented')
  }
  async getDocumentById (id) {
    throw new Error('Method getDocumentById() must be implemented')
  }
  async createDocument (data) {
    throw new Error('Method createDocument() must be implemented')
  }
  async updateDocument (id, data) {
    throw new Error('Method updateDocument() must be implemented')
  }
  async deleteDocument (id) {
    throw new Error('Method deleteDocument() must be implemented')
  }
}

module.exports = DocumentServiceInterface
