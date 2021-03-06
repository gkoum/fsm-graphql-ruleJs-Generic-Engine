import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
const { fsmImage } = require('../models/fsmImage')
const { wizardImage } = require('../models/wizardImage')
import pubsub, { EVENTS } from '../subscription'
import { isAuthenticated, isApplicationOwner } from './authorization'
const { helpers } = require('../helpers/helpers')
const { services } = require('../services/services')

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
        roles: activeFsm.roles,
        states: activeFsm.states,
        events: activeFsm.events,
        transitions: activeFsm.transitions.map(trans => JSON.stringify(trans)),
        services: JSON.stringify(activeFsm.services)
      }
    },
    wizard: async (parent, { }, { models }) => {
      console.log(wizardImage)
      console.log(wizardImage.transitions[0].name)
      // let wizard = wizardImage // await models.Fsm.findByPk(3)
      // wizard.transitions = wizardImage.transitions.map(trans => JSON.stringify(trans))
      // return wizard
      return {
        states: wizardImage.states.map(st => {
          return {
            id: st.id,
            name: st.name,
            description: st.description,
            ui: [st.ui[0].map(elem => JSON.stringify(elem))]
          }
        }),
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
      return services.wizardEvent({ name, body, models, image: 'wizard', numberOfPairs })
    },
    event: async (parent, { name, body }, { models, me }) => {
      console.log('-----event happened: ', parent, name, body, me)
      return services.event({ name, body, models, image: 'fsm' })
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
