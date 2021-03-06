const mongoose = require('mongoose')
const validator = require('validator')
const { toJSON, paginate } = require('../plugins')
const Ui = require('./ui.model').schema

const stateSchema = mongoose.Schema(
  {
    id: String,
    name: String,
    description: String,
    ui: [[Ui]]
  }
)

stateSchema.plugin(toJSON)
stateSchema.plugin(paginate)

const State = mongoose.model('State', stateSchema)

module.exports = State
