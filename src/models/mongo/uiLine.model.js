const mongoose = require('mongoose')
const validator = require('validator')
const { toJSON, paginate } = require('../plugins')
const Ui = require('./ui.model').schema

const uiLineSchema = mongoose.Schema(
  [Ui]
)

uiLineSchema.plugin(toJSON)
uiLineSchema.plugin(paginate)

const UiLine = mongoose.model('Ui', uiLineSchema)

module.exports = UiLine