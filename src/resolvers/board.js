import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';

import pubsub, { EVENTS } from '../subscription';
import { isAuthenticated } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    boards: async (parent, { }, { models }) => {
      console.log('------------------Boards')
      return await models.Boards.findAll()
    },
    board: async (parent, { id }, { models }) => {
      console.log('------------------Boards', models, id)
      return await models.Boards.findByPk(id)
    },
  },

  Mutation: {
    createBoard: combineResolvers(
      isAuthenticated,
      async (parent, { name, section }, { models, me }) => {
        const board = await models.Boards.create({
          name,
          sectionsId: section,
        })

        pubsub.publish(EVENTS.BOARD.CREATED, {
          boardCreated: { board },
        })

        return board
      },
    ),

    // deleteApplication: combineResolvers(
    //   isAuthenticated,
    //   isApplicationOwner,
    //   async (parent, { id }, { models }) => {
    //     return await models.Applications.destroy({ where: { id } });
    //   },
    // ),
  },

  // Application: {
  //   section: async (board, args, { loaders }) => {
  //     return await models.(application.externalUsersId);
  //   },
  // },

  // Subscription: {
  //   applicationCreated: {
  //     subscribe: () => pubsub.asyncIterator(EVENTS.APPLICATION.CREATED),
  //   },
  // },
};
