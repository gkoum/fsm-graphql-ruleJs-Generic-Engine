const lodash = require('lodash')
const { fsmImage } = require('../models/fsmImage')
const Engine = require("rules-js")
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
      console.log('Transition not Supported for this Event')
      return false
    } else if (transitions.length === 1) {
      console.log('One Transition exists for event: ' + transitions[0])
      return transitions[0]
    } else {
      console.log('More than one transition can be fired: ')
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

  Fsm.executePreActions = ({ application: body, transition: transition } = {}) => {
    console.log('executePreActions') // , application, values)
    if (transition.preconditions.services.length === 0) {
      return true
    } else {
      // for each key find the function and run it with parameters
      // if more than one consider the rule engine which creates a common context and facts
    }
    return true
  }

  Fsm.applyEffects = ({ application: application, transition: transition } = {}) => {
    console.log('applyEffects') // , application, values)
    console.log(transition.name)
    if (transition.effects.services) {
      // will call all services sync but we need async and await between them
      transition.effects.services.forEach(ser => {
        let serviceName = Object.keys(ser)[0]
        services[serviceName](ser[Object.keys(ser)].params)
      })
    } else if (transition.effects.servicesRules) {
      const parameters = { application: application, transition: transition }
      const engine = new Engine()

      engine.closures.add("always", (fact, context) => {
        console.log("always", fact, context.parameters)
        return true
      })

      engine.closures.add("insertJudgment", (fact, context) => {
        console.log("insertJudgment", context.parameters)
        return fact
      })

      function delay(t, v) {
        return new Promise(function (resolve) {
          setTimeout(resolve.bind(null, v), t)
        });
      }

      engine.closures.add("findHistoryNextStep", async (fact, context) => {
        console.log("findHistoryNextStep", context.parameters)
        fact.nextStep = delay(3000, {
          date: Date.now(),
          dateCompleted: "",
          applicationStatus: "userW_",
          user: { id: null, name: null, surname: null },
        })
        await fact.nextStep
        return fact
      })
      engine.closures.add("insertStep", (fact, context) => {
        console.log("insertStep", fact.nextStep, context.parameters)
        fact.application.history = fact.nextStep
        return fact
      })

      engine.closures.add("saveDB", (fact, context) => {
        fact.application.history.then(mes => console.log("saveDB" + mes))
        console.log("saveDB", fact.application.history.then(mes => mes), fact, context.parameters)
        return fact
      })

      engine.closures.add("isApplicationValid", (fact, context) => {
        console.log("isApplicationValid", fact.nextStep, context.parameters)
        return fact
      })

      engine.add(transition.effects.servicesRules);
      engine.process(transition.effects.servicesRules.name, parameters).then(result => {
        // console.log("result", result);
        const resultingDispatchOrder = result.fact;
        // console.log(resultingDispatchOrder)
        // handle the result in any way
      })
    }
    return true
  }

  return Fsm
}

export default fsm
