import { GraphQLDateTime } from 'graphql-iso-date'

import userResolvers from './user'
import messageResolvers from './message'
import applicationResolvers from './application'
import fsmResolvers from './fsm'
import boardResolvers from './board'
import applicationRoutesResolvers from './applicationRoutes';

const customScalarResolver = {
  Date: GraphQLDateTime,
}

export default [
  customScalarResolver,
  userResolvers,
  messageResolvers,
  applicationResolvers,
  fsmResolvers,
  boardResolvers,
  applicationRoutesResolvers
]
