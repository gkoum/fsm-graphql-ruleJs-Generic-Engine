import { gql } from 'apollo-server-express';
// applications(cursor: String, limit: Int): ApplicationConnection!
export default gql`
  extend type Query {
    applicationRoutes: [applicationRoute]
  }

  type applicationRoute {
    id: ID!
  }
`;
