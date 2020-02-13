import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
const { fsmImage } = require('../models/fsmImage')
import pubsub, { EVENTS } from '../subscription'
import { isAuthenticated, isApplicationOwner } from './authorization'

export default {
  Query: {
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
    event: async (parent, { name, body }, { models, me }) => {
      console.log(name, body)

      // map the event-name to an existing event on fsm
      if (!fsmImage.events.find(event => event.name === name)) {
        console.log('Event not Supported')
        return { name, judgment: 'Event not Supported' }
      }

      // Fetch and validate user with fsmSubject for the specific Event from db
      let userFromToken = { name: 'Giannis', surname: 'Koumoutsos', id: 10 }
      const fsmSubject = await models.Application.findByPk(body.applicationId)

      const validateUser = await models.User.validateUser(userFromToken, fsmSubject)
      console.log(validateUser)
      if (validateUser.roles.length === 0 || !validateUser.canIssueEvent || !validateUser.subjectBelongsToUser) {
        return { name, judgment: 'User not Authenticated-Authorized' }
      }

      // Check if subject in state that can accept this Event
      const validateEventForSubject = await models.Application.validateEventForSubject(fsmSubject)
      if (!validateEventForSubject) {
        return { name, judgment: 'Transition or Event not applicable for Subject' }
      }

      // find next state if transition depends on requests params (e.g. judgment.pending)
      const transition = await models.Fsm
        .validateTransitionRequest({ eventBody: body, event: name })
      if (!transition) { return { name, judgment: 'Transition could not be located' } }

      // Preconditions: validate transition request = {structure + specific values(were checked fοr transition) + needed actions}
      const structureApproved = await models.Application
        .validateStructure({ application: body, structure: body })
      const preActionsOk = await models.Fsm
        .executePreActions({ application: body, transition: transition })
      console.log(structureApproved, preActionsOk)
      if (!structureApproved || !preActionsOk) {
        return { name, judgment: 'Preconditions Failed' }
      }

      // Effects: move to new state and take all actions
      const effectsApplied = await models.Fsm.applyEffects({ application: body, transition: transition })
      if (effectsApplied) {
        console.log('effects applied')
        return { // each request has each own return described in transition as return.
          name, applicationId: body.applicationId, judgment: transition.name, userId: body.userId, roleId: body.roleId
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
