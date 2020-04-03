import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
const { fsmImage } = require('../models/fsmImage')
import pubsub, { EVENTS } from '../subscription'
import { isAuthenticated, isApplicationOwner } from './authorization'

function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t)
  });
}

export default {
  Query: {
    fsm: async (parent, { }, { activeFsm, models }) => {
      console.log(activeFsm)
      return {
        states: activeFsm.states,
        events: activeFsm.events,
        transitions: activeFsm.transitions.map(trans => JSON.stringify(trans))
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
    event: async (parent, { name, body }, { models, me }) => {
      console.log(parent, name, body, me)

      // map the event-name to an existing event on fsm
      if (!fsmImage.events.find(event => event.name === name)) {
        console.log('---Event not Supported')
        return { name, judgment: 'Event not Supported' }
      }

      // Fetch and validate user with fsmSubject for the specific Event from db
      let userFromToken = await delay(2000, {
        name: 'Giannis', surname: 'Koumoutsos', id: 10, roles: ['prechecker', 'admin']
      })

      let fsmSubject = await models.Applications.findByPk(body.application.id)
      fsmSubject = fsmSubject.dataValues
      console.log('----------- fsmSubject', fsmSubject)

      const validateUser = await models.Users.validateUser(userFromToken, fsmSubject)
      if (validateUser.roles.length === 0 || !validateUser.canIssueEvent || !validateUser.subjectBelongsToUser) {
        return { name, judgment: '---User not Authenticated-Authorized' }
      }

      // Check if subject in state that can accept this Event
      const validateEventForSubject = await models.Applications.validateEventForSubject({
        subject: fsmSubject,
        event: name
      })
      if (!validateEventForSubject) {
        return { name, judgment: '---Transition or Event not applicable for Subject' }
      }

      // find next state if transition depends on requests params (e.g. judgment.pending)
      const transition = await models.Fsm
        .validateTransitionRequest({ eventBody: body, event: name })
      if (!transition) { return { name, judgment: '---Transition could not be located' } }

      // Preconditions: validate transition request = {structure + specific values(were checked fοr transition) + needed actions}
      const structureApproved = await models.Applications
        .validateStructure({ application: body, structure: transition.preconditions.request.hasStructure })
      const preActionsOk = await models.Fsm
        .executePreActions({ fsmSubject: fsmSubject, transition: transition })
      console.log(structureApproved, preActionsOk)
      if (!structureApproved || !preActionsOk) {
        return { name, judgment: 'Preconditions Failed' }
      }

      // Effects: move to new state and take all actions
      const effectsApplied = await models.Fsm.applyEffects({ fsmSubject: fsmSubject, transition: transition, body: body })
      if (effectsApplied) {
        console.log('---Εffects applied')
        return { // each request has each own return described in transition as return.
          name, applicationId: body.applicationId, judgment: transition.name, roleId: body.roleId,
          newState: transition.to
        }
      } else {
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
