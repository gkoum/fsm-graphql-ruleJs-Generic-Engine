const lodash = require('lodash')
const { fsmImage } = require('../models/fsmImage')
const Engine = require("rules-js")
const ruleEngine = require("../ruleEngine/rules")
const { services } = require('../services/services')

const fsm = (sequelize, DataTypes) => {
  const Fsm = sequelize.define('fsm', {
    states: {
      type: DataTypes.JSON
    },
    events: {
      type: DataTypes.JSON
    },
    transitions: {
      type: DataTypes.JSON
    }
  })

  Fsm.validateTransitionRequest = ({ eventBody: body, event: event } = {}) => {
    console.log('validateTransitionRequest') // , application, values)
    // Locate transition if available and validate if possible
    const transitions = fsmImage.transitions.filter(trans => trans.atEvent === event)
    if (transitions.length < 1) {
      console.log('No transitions are supported for this Event')
      return false
    } else {
      console.log('One or More transitions can be fired: ')
      // see precondition values to locate the exact transition hasValue: [{ judgment: { pending: false }}],
      // make the assumption that the object will be the same in the request as in hasValue???
      let subjectPreconditionHasValue = body
      // let preconditionsFsm = transitions.map(trans => trans.preconditions.request.hasValue)
      // get the available hasValue preconditions from the selected Transitions
      let transTemp = []
      let transAccepted = true
      transitions.forEach(trans => {
        let hasValue = trans.preconditions.request.hasValue
        transAccepted = true
        console.log(trans.name)
        // needs a loop to check all keys and then push
        for (const key of Object.keys(hasValue)) {
          console.log(key)
          console.log(hasValue[key], subjectPreconditionHasValue[key])
          if (subjectPreconditionHasValue[key] && !lodash.isEqual(hasValue[key], subjectPreconditionHasValue[key])) {
            console.log(trans.name + ' was REJECTED')
            transAccepted = false
            continue
          }
        }
        if (transAccepted === true) {
          transTemp.push(trans)
        }
      })
      console.log(transTemp.map(tr => tr.preconditions.request.hasValue))
      let numOfTrans = transTemp.length
      if (numOfTrans === 1) {
        console.log('Transition located: ' + transTemp[0].name)
        return transTemp[0]
      } else if (numOfTrans > 1) {
        console.log('Error: More than one transition matches hasValue Preconditions')
        return false
      } else if (numOfTrans === 0) {
        console.log('Error: No transition matches hasValue Preconditions')
        return false
      }
    }
    return false
  }

  Fsm.executePreActions = async ({ fsmSubject: fsmSubject, transition: transition } = {}) => {
    console.log('executePreActions') // , fsmSubject, values)
    if (transition.preconditions.services) {
      const promises = transition.preconditions.services.map(async ser => {
        let serviceName = Object.keys(ser)[0]
        console.log('---executing: ', serviceName)
        let servicesResults = await services[serviceName](ser[Object.keys(ser)].params, { fsmSubject: fsmSubject, transition: transition })
        console.log(serviceName, '---executed with results: ', servicesResults)
        return servicesResults
      })
      const servicesExecuted = await Promise.all(promises)
      console.log(servicesExecuted)
    } else if (transition.preconditions.servicesRules) {
      await ruleEngine.run({ fsmSubject: fsmSubject, transition: transition }).then(result => {
        console.log("---engine results: ", result)
      })
    }
    return true
  }

  Fsm.applyEffects = async ({ fsmSubject: fsmSubject, transition: transition, body: body } = {}) => {
    console.log('---ΑpplyEffects', body) // , application, values)
    if (transition.effects.services) {
      const promises = transition.effects.services.map( async ser => {
        let serviceName = Object.keys(ser)[0]
        console.log('---executing: ', serviceName)
        let servicesResults = await services[serviceName](ser[Object.keys(ser)].params, { fsmSubject: fsmSubject, transition: transition })
        console.log(serviceName, '---executed with results: ', servicesResults)
        return servicesResults
      })
      const servicesExecuted = await Promise.all(promises)
      console.log(servicesExecuted)
    } else if (transition.effects.servicesRules) {
      await ruleEngine.run({ fsmSubject: fsmSubject, transition: transition }).then(result => {
        console.log("---engine results: ", result)
      })
    }
    return true
  }

  return Fsm
}

export default fsm
