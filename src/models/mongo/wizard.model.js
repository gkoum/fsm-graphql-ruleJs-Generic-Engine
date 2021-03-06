const mongoose = require('mongoose')
const validator = require('validator')
const { toJSON, paginate } = require('../plugins')
const State = require('./state.model').schema
const Event = require('./event.model').schema
const Transition = require('./transition.model').schema
const Role = require('./role.model').schema
const Service = require('./service.model').schema

const wizardSchema = mongoose.Schema(
  {
    states: [State],
    events: [Event],
    transitions: [Transition],
    roles: [Role],
    services: Object

  }
)

// add plugin that converts mongoose to json
wizardSchema.plugin(toJSON)
wizardSchema.plugin(paginate)

const Wizard = mongoose.model('Wizard', wizardSchema)

module.exports = Wizard
