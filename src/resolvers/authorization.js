import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'ADMIN'
      ? skip
      : new ForbiddenError('Not authorized as admin.'),
);

export const isMessageOwner = async (
  parent,
  { id },
  { models, me },
) => {
  console.log('isMessageOwner', id)
  const message = await models.Message.findByPk(id, { raw: true });

  if (message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
export const isApplicationOwner = async (
  parent,
  { id },
  { models, me },
) => {
  console.log('isApplicationOwner', id)
  const application = await models.Applications.findByPk(id, { raw: true });

  if (application.externalUsersId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
