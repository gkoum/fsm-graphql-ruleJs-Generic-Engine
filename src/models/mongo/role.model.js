const mongoose = require('mongoose')
const validator = require('validator')
const { toJSON, paginate } = require('../plugins')

const roleSchema = mongoose.Schema(
  {
    name: String,
    hasAccess: [String],
    events: [String]
  }
)

roleSchema.plugin(toJSON)
roleSchema.plugin(paginate)

const Role = mongoose.model('Role', roleSchema)

module.exports = Role