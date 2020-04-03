import { gql } from 'apollo-server-express';
// applications(cursor: String, limit: Int): ApplicationConnection!
export default gql`
  extend type Query {
    boards: [board!]
    board(id: ID!): board!
  }

  extend type Mutation {
    createBoard(text: String!): board!
    deleteBoard(id: ID!): Boolean!
    updateBoard(board: String!): board!
  }

  # type BoardConnection {
  #   edges: [board!]!
  #   pageInfo: PageInfo!
  # }

  type board {
    id: ID!
    name: String!
    sectionsId: ID
  }
`;
