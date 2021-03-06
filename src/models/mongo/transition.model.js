const mongoose = require('mongoose')
const validator = require('validator')
const { toJSON, paginate } = require('../plugins')

const transitionSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    from: String,
    to: String,
    atEvent: String,
    preconditions: {
      request: {
        hasStructure: Object,
        hasValue: Object
      },
      services: Object
    },
    effects: {
      response: {
        haStructure: Object,
        hasValue: Object
      },
      services: Object
    }
  }
)

transitionSchema.plugin(toJSON)
transitionSchema.plugin(paginate)

const Transition = mongoose.model('Transition', transitionSchema)

module.exports = Transition