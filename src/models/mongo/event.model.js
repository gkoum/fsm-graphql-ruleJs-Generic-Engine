const mongoose = require('mongoose')
const validator = require('validator')
const { toJSON, paginate } = require('../plugins')

const eventSchema = mongoose.Schema(
  {
    body: Object,
    name: String,
    description: String
  }
)

eventSchema.plugin(toJSON)
eventSchema.plugin(paginate)

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
