import { gql } from 'apollo-server-express';

import userSchema from './userSchema';
import messageSchema from './messageSchema';
import fsmSchema from './fsmSchema';
import applicationSchema from './applicationSchema';
import boardSchema from './boardSchema';
import applicationRoutesSchema from './applicationRoutesSchema';
import wizardSchema from './wizardSchema';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  userSchema,
  messageSchema,
  fsmSchema,
  wizardSchema,
  applicationSchema,
  boardSchema,
  applicationRoutesSchema
];
