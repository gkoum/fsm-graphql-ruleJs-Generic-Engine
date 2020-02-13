import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';

import pubsub, { EVENTS } from '../subscription';
import { isAuthenticated, isApplicationOwner } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    applications: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
          where: {
            createdAt: {
              [Sequelize.Op.lt]: fromCursorHash(cursor),
            },
          },
        }
        : {};

      const applications = await models.Application.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });

      const hasNextPage = applications.length > limit;
      const edges = hasNextPage ? applications.slice(0, -1) : applications;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString(),
          ),
        },
      };
    },
    application: async (parent, { id }, { models }) => {
      console.log('------------------application', parent, id)
      return await models.Application.findByPk(id);
    },
  },

  Mutation: {
    createApplication: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        const application = await models.Application.create({
          text,
          userId: me.id,
        });

        pubsub.publish(EVENTS.APPLICATION.CREATED, {
          applicationCreated: { application },
        });

        return application;
      },
    ),

    deleteApplication: combineResolvers(
      isAuthenticated,
      isApplicationOwner,
      async (parent, { id }, { models }) => {
        return await models.Application.destroy({ where: { id } });
      },
    ),
  },

  Application: {
    user: async (application, args, { loaders }) => {
      return await loaders.user.load(application.userId);
    },
  },

  Subscription: {
    applicationCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.APPLICATION.CREATED),
    },
  },
};
