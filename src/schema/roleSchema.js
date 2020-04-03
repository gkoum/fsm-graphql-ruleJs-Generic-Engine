import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    roles: [Role]
    role(name: String!): Message!
  }

  extend type Mutation {
    createRole(text: String!): Role!
    deleteRole(name: String!): Boolean!
  }

  type Role {
    id: ID!
    text: String!
    createdAt: Date!
    users: [User]
  }

  extend type Subscription {
    roleCreated: RoleCreated!
  }

  type RoleCreated {
    role: Role!
  }
`;
