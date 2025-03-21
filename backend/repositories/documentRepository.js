const Document = require('../models/documentModel')
const DocumentRepositoryInterface = require('./interfaces/documentRepositoryInterface')

class DocumentRepository extends DocumentRepositoryInterface {
  async getAll () {
    return await Document.find()
  }

  async getById (id) {
    return await Document.findById(id)
  }

  async create (data) {
    const document = new Document(data)
    return await document.save()
  }

  async update (id, data) {
    return await Document.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    })
  }

  async delete (id) {
    return await Document.findByIdAndDelete(id)
  }
}

module.exports = DocumentRepository
