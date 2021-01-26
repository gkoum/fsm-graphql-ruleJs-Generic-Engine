import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
const { fsmImage } = require('../models/fsmImage')
const { wizardImage } = require('../models/wizardImage')
import pubsub, { EVENTS } from '../subscription'
import { isAuthenticated, isApplicationOwner } from './authorization'
const { helpers } = require('../helpers/helpers')

function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t)
  });
}

export default {
  Query: {
    fsm: async (parent, { }, { activeFsm, models }) => {
      console.log('activeFsm' + activeFsm)
      return {
        roles: activeFsm.roles,
        states: activeFsm.states,
        events: activeFsm.events,
        transitions: activeFsm.transitions.map(trans => JSON.stringify(trans))
      }
    },
    wizard: async (parent, { }, { models }) => {
      console.log(wizardImage)
      console.log(wizardImage.transitions[0].name)
      // let wizard = wizardImage // await models.Fsm.findByPk(3)
      // wizard.transitions = wizardImage.transitions.map(trans => JSON.stringify(trans))
      // return wizard
      return {
        states: wizardImage.states,
        events: wizardImage.events,
        transitions: wizardImage.transitions.map(trans => JSON.stringify(trans))
      }
    },
    event: async (parent, { name }, { models }) => {
      // map the event-name to an existing event on fsm
      console.log(name)
      const event = await fsmImage.events.find(event => event.name === name)
      console.log(event)
      if (!event) {
        console.log('Event not Supported')
        return { name, description: 'Event not Supported' }
      }
      return event
    },
    transitions: async (parent, { name }, { models }) => {
      return {
        name: name,
        description: "",
        from: "1",
        to: "2",
        atEvent: "",
        preconditions: ["precondition"],
        effects: ["effect"]
      }
    },
    transition: async (parent, { name }, { models }) => {
      console.log('------------transition', name)
      return {
        name: name,
        description: "",
        from: "1",
        to: "2",
        atEvent: "",
        preconditions: ["precondition"],
        effects: ["effect"]
      }
    }
  },  
  Mutation: {
    updateFsm: async (parent, { name, fsm }, { models, me }) => {
      // const fsm = await models.Fsm.create({
      //   states: fsmImage.states,
      //   transitions: fsmImage.transitions,
      //   events: fsmImage.events,
      // })
      console.log(fsm)
      const fsmDb = await models.Fsm.findByPk(1)
      return await fsmDb.update({ 
        states: fsm.states,
        transitions: fsm.transitions,
        events: fsm.events
      })

      // return fsm
    },

    updateWizard: async (parent, { name, wizard }, { models, me }) => {
      console.log(wizard)
      const fsmDb = await models.Fsm.findByPk(3)
      return await fsmDb.update({
        states: wizard.states,
        transitions: wizard.transitions,
        events: wizard.events
      })
    },

    wizardEvent: async (parent, { name, body, numberOfPairs }, { models, me }) => {
      console.log('-------------wizardEvent')
      console.log(name, body, numberOfPairs)
      // const jsonBody = JSON.parse(body)
      // 1.	map the event to an existing event on wizard => NEED array of string events
      if (!wizardImage.events.find(event => event.name === name)) {
        console.log('---Event not Supported')
        return { name, description: 'Event not Supported' }
      }

      // 2.	Fetch and validate user and fsmSubject for the specific Event from db
      let userFromToken = await delay(100, {
        name: 'Giannis', surname: 'Koumoutsos', id: 10, state: name // 'Personal Data'
      })
      let fsmSubject = {}
      // if (!fsmSubject.belongsTo(userFromToken)) {
      //   console.log('---This application is not assigned to the given user')
      //   return { name, description: 'This application is not assigned to the given user' }
      // }

      // 3.	Check if subject in state that can accept this Event => NEED array of events and states that are applicable.
      const transitionsForState = wizardImage.transitions
        .filter(tr => tr.atEvent === name && tr.from === userFromToken.state)
      if (transitionsForState.length < 1) {
        console.log('---Event for current State not Supported')
        return { name, description: 'Event for current State not Supported' }
      }

      // 4.	Find transition and next state depending on eventBody (e.g. pending)
      const transition = await models.Fsm.validateTransitionRequest({
        eventBody: helpers.last(body, numberOfPairs),
        event: name,
        type: 'wizard',
        allowedTransitions: transitionsForState
      })
      if (!transition) {
        return { name, description: '---Transition could not be located' }
      }
      const newState = wizardImage.states.find(st => st.name === transition.to)

      // 5.	Check Preconditions: validate transition request = 
      // {structure + specific values(were checked fοr transition) + needed actions}
      const structureApproved = await models.Applications.validateStructure({
        application: body,
        structure: transition.preconditions.request.hasStructure
      })
      const preActionsOk = await models.Fsm.executePreActions({ 
        fsmSubject: fsmSubject,
        transition: transition,
        body: body
      })
      console.log(structureApproved, preActionsOk)
      if (!structureApproved || !preActionsOk) {
        return { name, description: 'Preconditions Failed' }
      }
      // Effects must be AFTER preconditions-preactions succesful end
      // 6.	Apply Effects: move to new state and take all action
      const effectsApplied = await models.Fsm.applyEffects({
        fsmSubject: fsmSubject,
        transition: transition,
        body: body
      })
      if (effectsApplied) {
        console.log('---Εffects applied')
        return { // each request has each own return described in transition as return.
          name: newState.name,
          description: newState.description,
          ui: newState.ui
        }
      } else {
        return { name, description: 'Effects could not be applied' }
      }
    },
    event: async (parent, { name, body }, { models, me }) => {
      console.log('-----event happened: ', parent, name, body, me)

      // 1.	eventExists map the event to an existing event on wizard => NEED array of string events
      const eventExists = fsmImage.events.find(event => event.name === name) 
      if (!eventExists) {
        console.log('---Event not Supported')
        return { name, judgment: 'Event not Supported' }
      }

      // 2.	Fetch USER-FSMSUBJECT-SYSTEM ROLES
      // fetch roles in RAM
      const roles = await models.Roles.findAll()
      const allRoles = roles.map(role => { return { id: role.id, name: role.name } })
      // const userFromToken = await delay(2000, {id: 10})
      const userDb = await models.Users.findByPk('1a0e3eba-af5e-11e8-aec6-aa00006b40c9')
      const userRoles = await models.UserRoles.findAll({
        where: {
          user_id: '1a0e3eba-af5e-11e8-aec6-aa00006b40c9'
        },
      })
      
      const userAllRoles = allRoles.filter(role => userRoles.map(r => r.roleId).includes(role.id))
      const userAllRolesName = userAllRoles.map(role => role.name)

      // console.log(userDb.name, allRoles, userAllRoles, userAllRolesName)
      // userRoles.forEach(role => console.log(role.roleId))

      // the DB module will retrieve from db and put into context with names given in fsmImage 
      const fsmSubjectDb = await models.Applications.findByPk('610')
      const subjectHistory = await models.ApplicationRoutes.findAll({
        where: {
          application_id: '610'
        },
      })
      // console.log(fsmSubjectDb.specialFields, fsmSubjectDb.externalUsersId)
      subjectHistory.forEach(step => console.log(step.applicationStatus))
      const fsmSubjectS = {
        consideration: true,
        correspondence: true,
        degreeType: "bachelor",
        id: 1263,
        recognitionWith: "aeiAndTei",
        applicationHistory: [
          {
            applicationStatus: "userW_",
            date: "2020-12-30 12:17:02",
            dateCompleted: "2021-01-08 13:59:12",
            id: 6876,
            judgment: null,
            releaseComment: null,
            reroute: false,
            rerouteComment: null,
            role: null,
            user: { id: null, name: null, surname: null}
          },
          {
            applicationStatus: "precheckersQueue",
            date: "2021-01-08 13:59:12",
            dateCompleted: "2021-01-08 14:00:04",
            id: 6921,
            judgment: null,
            releaseComment: null,
            reroute: false,
            rerouteComment: null,
            role: "PreChecker",
            user: { id: null, name: null, surname: null }
          },
          {
            applicationStatus: "precheckerW_",
            date: "2021-01-08 14:00:04",
            dateCompleted: null,
            id: 6939,
            judgment: {
              academicField: { id: null, name: null },
              id: null,
              name: null,
              color: null,
              internalComment: null,
              pending: false,
              pendingReason: null,
              queue: null
            },
            releaseComment: null,
            reroute: false,
            rerouteComment: null,
            role: "PreChecker",
            user: { id: "1a0e3eba-af5e-11e8-aec6-aa00006b40c9", name: "doatap1", surname: "Rigas" }
          }
        ]
      }
      const fsmSubject = fsmSubjectS
      console.log('----------- fsmSubject')
      const fsmObjectLastStep = helpers.last(fsmSubject.applicationHistory)

      // 3. Can the user (depending on his roles - can have multiple roles) fire such an event?
      // Need to produce an eventAvalable/Role array event: [allowedRoles] and check if user has one of them
      const allUserEvents = fsmImage.roles
        .filter(role => userAllRolesName.includes(role.name))
        .reduce((acc, val) => acc.events.concat(val.events))
      console.log(allUserEvents)

      const canUserSendEvent = allUserEvents.includes(eventExists.name)
      // = eventExists.roles.some(role=> userDb.roles.indexOf(role) >= 0)
      if (!canUserSendEvent) {
        console.log('---User cannot send such an event')
        return { name, judgment: 'User cannot send such an event' }
      }

      // 4. Can the user access the specific fsmSubject in the current state?
      // userHasAccessTo --> app.state --> app under users processing
      // or if user null belongs to all in role like viewer
      const allUserStates = fsmImage.roles
        .filter(role => userAllRolesName.includes(role.name))
        .reduce((acc, val) => acc.hasAccess.concat(val.hasAccess))
      // console.log(allUserStates, fsmObjectLastStep.applicationStatus, fsmObjectLastStep.user.id, userDb.id)
      
      const canUserAccessObject = allUserStates.includes(fsmObjectLastStep.applicationStatus) &&
        fsmObjectLastStep.user.id === userDb.id || null
      if (!canUserAccessObject) {
        console.log('---User cannot access the specific app')
        return { name, judgment: 'User cannot access the specific app' }
      } else {
        console.log(
          '---User can access the specific app: ',
          fsmObjectLastStep.applicationStatus,
          fsmObjectLastStep.user.id
        )
      }

      // 5. Is the fsmSubject in state that can accept this Event => SAME AS 6?
      // NEED array of events and states that are applicable: state: [eventsApplicable]
      const applicableEventsForState = fsmImage.states
        .find(state => state.name === fsmObjectLastStep.applicationStatus).events
      console.log(applicableEventsForState)
      
      const canSubjectAcceptEvent = applicableEventsForState.includes(name)

      if (!canSubjectAcceptEvent) {
        console.log('---Event: ', name, ' not applicable for Subject: ', fsmObjectLastStep.applicationStatus)
        return { name, judgment: '---Event not applicable for Subject' }
      } else {
        console.log('---Event: ', name, ' applicable for Subject: ', fsmObjectLastStep.applicationStatus)
      }

      // 6. Find all avalable transitions: NEED array state: [transitions] --- not search for it each time
      // Approve transition = (fired at this Event) + (tr.from = fsmObject DB state)
      const transitionsForState = fsmImage.transitions
        .filter(tr => tr.atEvent === name)
      if (transitionsForState.length < 1) {
        console.log('---Event for current Subject State not Supported')
        return {
          name,
          error: 'Event for current Subject State not Supported',
          currentState: name
        }
      }

      // 7.	Find transition and next state depending on eventBody (e.g. pending)
      const transition = await models.Fsm.validateTransitionRequest({
          eventBody: body,
          event: name,
          type: 'fsm',
          allowedTransitions: transitionsForState
        })
      if (!transition) { return { name, judgment: '---Transition could not be located' } }
      
      // STEPS 1-7 are done in parallel to successful completion and then
      //    STEP 8 is done to successful completion and then
      //      STEP 9 is done to successful completion and then
      // END
      // => each should return a promice and check for successful completion to go to next step
      // validateRequest().then(validationResults => {
      //   checkPreconditions(validationResults).then(preResults => {
      //     runPreconditions(preResults).then(preSerResults => {
      //       applyEffects(preSerResults).then(allResults => console.log(allResults))
      //     })
      //   })
      // })
      // STEP 1-7 to be given in a json and implemented dynamically again to have an array of promises
      // and use those that are needed each time
      // VALIDATE_REQUEST: [
      //   { eventExists: { params: { eventName: 'precheckerFinalSave' }, execution: 'sync'},
      //   {fetchUser: params: {}, execution: 'async'},
      //   {fetchFsmSubject: params: {}, execution: 'async'},
      //   {canUserSendEvent: params: {}},
      //   {canUserAccessObject: params: {}},
      //   {canSubjectAcceptEvent: params: {}},
      //   {transitionsForState: params: {}},
      //   {transition: params: {}}
      // ]

      // 8.	Check Preconditions: validate transition request = 
      // {structure + specific values(were checked fοr transition) + needed actions}
      const structureApproved = await models.Applications.validateStructure({
        application: body,
        structure: transition.preconditions.request.hasStructure
      })
      const preActionsOk = await models.Fsm.executePreActions({
        fsmSubject: fsmSubject,
        transition: transition
      })
      console.log(structureApproved, preActionsOk)
      if (!structureApproved || !preActionsOk) {
        return { name, judgment: 'Preconditions Failed' }
      }

      // 9.	Apply Effects: move to new state and take all action
      const effectsApplied = await models.Fsm.applyEffects({
        fsmSubject: fsmSubject,
        transition: transition,
        body: body
      })

      console.log('------- Effects: ', effectsApplied)
      if (effectsApplied) {
        console.log('---Εffects applied')
        // each request has each own returned values described in transition as response.hasStructure
        // so API has all possible concepts and for each the response is assempled dynamically
        // transition.effects.response.hasStructure{for each key add the same name from context}
        return {
          name,
          fsmObjectId: fsmSubject.id,
          judgment: transition.name,
          roleId: body.roleId,
          currentState: fsmObjectLastStep.applicationStatus,
          newState: transition.to
        }
      } else {
        console.log('--- Effects could not be applied')
        return { name, judgment: 'Effects could not be applied' }
      }
    },
    createTransition: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        // const transition = await models.Transition.create({
        //   text,
        //   userId: me.id,
        // });

        // pubsub.publish(EVENTS.TRANSITION.CREATED, {
        //   transitionCreated: { transition },
        // });

        // return transition;
      }
    ),
    deleteTransition: combineResolvers(
      // isAuthenticated,
      // isApplicationOwner,
      // async (parent, { id }, { models }) => {
      //   return await models.Transition.destroy({ where: { id } });
      // },
    ),
  },
  Transition: {
    // user: async (application, args, { loaders }) => {
    //   return await loaders.user.load(application.userId);
    // },
  },

  Subscription: {
    // applicationCreated: {
    //   subscribe: () => pubsub.asyncIterator(EVENTS.APPLICATION.CREATED),
    // },
  },
};
