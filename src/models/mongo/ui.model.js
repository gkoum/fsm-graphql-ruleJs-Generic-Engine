const mongoose = require('mongoose')
const validator = require('validator')
const { toJSON, paginate } = require('../plugins')

const uiSchema = mongoose.Schema(
  {
    label: String,
    type: String,
    min: Number,
    max: Number,
    help: String
  }
)

uiSchema.plugin(toJSON)
uiSchema.plugin(paginate)

const Ui = mongoose.model('Ui', uiSchema)

module.exports = Ui