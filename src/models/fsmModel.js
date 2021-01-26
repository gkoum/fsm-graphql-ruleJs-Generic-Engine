// import { deepEqual } from 'assert';

// const lodash = require('lodash')
const { fsmImage } = require('../models/fsmImage')
const { wizardImage } = require('../models/wizardImage')
const Engine = require("rules-js")
const ruleEngine = require("../ruleEngine/rules")
const { services } = require('../services/services')
const { validateValueToRule } = require('../services/validateValueToRule')

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

  function Serial(promises = [], contextAll = {}) {
    return {
      promises,
      contextAll,
      resolved: [],
      addPromise: function (fn) {
        console.log(fn)
        promises.push(fn);
      },
      resolve: async function (context, cb = i => i, err = (e) => console.log("trace: Serial.resolve " + e)) {
        try {
          console.log('--------Serial: ', context, cb, err)
          contextAll = context
          for await (let p of this[Symbol.iterator](contextAll)) {
            console.log('--------p: ')
            console.log(p)
            // console.log(contextAll)
            contextAll = Object.assign({}, contextAll, p);
          }
          return this.resolved.map(cb);
        } catch (e) {
          err(e);
        }
      },
      [Symbol.iterator]: async function* () {
        this.resolved = [];
        for (let promise of this.promises) {
          console.log('--------contextAll: ')
          // console.log(contextAll)
          let p = await promise(contextAll).catch(e => console.log("trace: Serial[Symbol.iterator] ::" + e));
          this.resolved.push(p);
          console.log(this.resolved)
          yield p;
        }
      }
    }
  }

  Fsm.validateTransitionRequest = ({ eventBody: body, event, type, allowedTransitions } = {}) => {
    console.log('validateTransitionRequest')
    console.log(body, event, type, allowedTransitions)

    let subjectPreconditionHasValue = JSON.parse(JSON.stringify(body))

    let transTemp = []
    let transAccepted = true
    allowedTransitions.forEach(trans => {
      let hasValue = trans.preconditions.request.hasValue
      transAccepted = true

      // check if values are given as an array or an object -- must be the same in wizardImage?
      if (Array.isArray(subjectPreconditionHasValue)) {
        console.log('----values given as an array')

        if (!Array.isArray(hasValue)) {
          console.log('---- REJECTED with type mismatch for an array')
          return false
        }

        subjectPreconditionHasValue.forEach(pair => {
          console.log(pair)
          let findPairWithName = hasValue.find(subjectPair => subjectPair.name === pair.name)
          // if (findPairWithName && findPairWithName.value === pair.value) {
          //   console.log(trans.name + ' was found')
          if (findPairWithName) {
            console.log('---------comparing value to rule')
            if (!validateValueToRule.validate(findPairWithName, pair)) {
              console.log('---- REJECTED from validation')
              transAccepted = false
              return false
            }
          } else {
            console.log('---- REJECTED pairs dont match')
            transAccepted = false
            return false
          }
        })
      } else {
        for (const key of Object.keys(hasValue)) {
          console.log(key, hasValue[key], subjectPreconditionHasValue[key])
          if (!services.deepEqual(hasValue[key], subjectPreconditionHasValue[key])) {
            console.log(trans.name + ' was REJECTED')
            transAccepted = false
            continue
          }
        }
      }
      console.log(transAccepted)
      if (transAccepted === true) {
        transTemp.push(trans)
      }
      console.log(transTemp)
    })

    const numOfTrans = transTemp.length
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
    return false
  }

  Fsm.executePreActions = async ({ fsmSubject, transition, body } = {}) => {
    console.log('----executePreActions') // , fsmSubject, values)
    if (transition.preconditions.services) {
      let subjectContext = { fsmSubject: fsmSubject, transition: transition, eventBody: body, context: [] }
      let allServices = transition.preconditions.services.map(ser => services[Object.keys(ser)[0]]) //(ser[Object.keys(ser)].params, subjectContext)
      console.log('----allServices')
      console.log(allServices)
      let promises = Serial(allServices)
      promises.resolve(subjectContext).then(resolutions => {
        console.log('-------------------resolutions' + resolutions)
        return true
      })
      // const promises = transition.preconditions.services.map(async ser => {
      //   let serviceName = Object.keys(ser)[0]
      //   console.log('---executing: ', serviceName)
      //   let servicesResults = await services[serviceName](ser[Object.keys(ser)].params, { fsmSubject: fsmSubject, transition: transition })
      //   console.log(serviceName, '---executed with results: ', servicesResults)
      //   return servicesResults
      // })
      // const servicesExecuted = await Promise.all(promises)
      // console.log(servicesExecuted)
    } else if (transition.preconditions.servicesRules) {
      return await ruleEngine.run({ fsmSubject: fsmSubject, transition: transition }).then(result => {
        console.log("---engine results: ", result)
        return true
      })
    }
    return true
  }

  Fsm.applyEffects = async ({ fsmSubject, transition, body } = {}) => {
    console.log('---ΑpplyEffects', body)
    if (transition.effects.services) {
      let subjectContext = { fsmSubject: fsmSubject, transition: transition, eventBody: body, context: [] }
      let allServices = transition.effects.services.map(ser => services[Object.keys(ser)[0]]) //(ser[Object.keys(ser)].params, subjectContext)
      console.log('---allServices')
      console.log(allServices)
      let promises = Serial(allServices)
      return await promises.resolve(subjectContext).then(resolutions => {
        console.log('-------------------resolutions' + resolutions)
        return true
      })
    } else if (transition.effects.servicesRules) {
      return await ruleEngine.run({ fsmSubject: fsmSubject, transition: transition }).then(result => {
        console.log("---engine results: ", result)
        return true
      })
    }
    // return true
  }

  return Fsm
}

export default fsm
