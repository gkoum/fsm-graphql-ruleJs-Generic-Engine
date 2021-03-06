const mongoose = require('mongoose')
const validator = require('validator')
const { toJSON, paginate } = require('../plugins')

const serviceSchema = mongoose.Schema(
  {
    name: String
  }
)

serviceSchema.plugin(toJSON)
serviceSchema.plugin(paginate)

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service