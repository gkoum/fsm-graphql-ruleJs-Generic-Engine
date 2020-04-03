import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'

import pubsub, { EVENTS } from '../subscription'
import { isAuthenticated, isApplicationOwner } from './authorization'

const toCursorHash = string => Buffer.from(string).toString('base64')

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    // applications: async (parent, { cursor, limit = 100 }, { models }) => {
    //   const cursorOptions = cursor
    //     ? {
    //       where: {
    //         createdAt: {
    //           [Sequelize.Op.lt]: fromCursorHash(cursor),
    //         },
    //       },
    //     }
    //     : {};

    //   const applications = await models.Application.findAll({
    //     order: [['createdAt', 'DESC']],
    //     limit: limit + 1,
    //     ...cursorOptions,
    //   });

    //   const hasNextPage = applications.length > limit;
    //   const edges = hasNextPage ? applications.slice(0, -1) : applications;

    //   return {
    //     edges,
    //     pageInfo: {
    //       hasNextPage,
    //       endCursor: toCursorHash(
    //         edges[edges.length - 1].createdAt.toString(),
    //       ),
    //     },
    //   };
    // },
    applicationHistory: async (parent, {id}, { models }) => {
      console.log('------------------get applicationHistory')
      return await models.ApplicationRoutes.findAll({
        where: {
          applicationId: {
            $in: id,
          },
        },
      });
    },
    applications: async (parent, {}, { models }) => {
      console.log('------------------get applications')
      return await models.Applications.findAll()
    },
    application: async (parent, { id }, { models }) => {
      console.log('------------------application')
      // return await models.Applications.findByPk(id);
      let app = await models.Applications.findByPk(id)
      console.log(app)
      return app
    },
  },

  Mutation: {
    createApplication: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        const application = await models.Applications.create({
          text,
          externalUsersId: me.id,
        });

        pubsub.publish(EVENTS.APPLICATION.CREATED, {
          applicationCreated: { application },
        });

        return application
      },
    ),

    deleteApplication: combineResolvers(
      isAuthenticated,
      isApplicationOwner,
      async (parent, { id }, { models }) => {
        return await models.Applications.destroy({ where: { id } });
      },
    ),
  },

  Application: {
    user: async (application, args, { models }) => {
      console.log('---------------------getting user for app')
      return await models.ExternalUsers.findByPk(application.externalUsersId)
    },
    history: async (application, args, { models }) => {
      console.log('------------------get applicationHistory', application.id)
      let historySteps = await models.ApplicationRoutes.findAll({
        where: { applicationId: application.id },
      });
      console.log(historySteps.map(step => JSON.stringify(step)))
      return historySteps.map(step => JSON.stringify(step))

    }
  },

  Subscription: {
    applicationCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.APPLICATION.CREATED),
    },
  },
};
