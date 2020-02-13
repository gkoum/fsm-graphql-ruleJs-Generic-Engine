import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    applications(cursor: String, limit: Int): ApplicationConnection!
    application(id: ID!): Application!
  }

  extend type Mutation {
    createApplication(text: String!): Application!
    deleteApplication(id: ID!): Boolean!
  }

  type ApplicationConnection {
    edges: [Application!]!
    pageInfo: PageInfo!
  }

  type Application {
    id: ID!
    personalDetails: PersonalDetails
    title: Title
    titleConsideration: Title
    history: History
    user: User!
  }

  type PersonalDetails {
    id: ID!
    name: String
    surname: String
  }

  type Title {
    id: ID!
    university: String
  }

  type History {
    id: ID!
    judgement: String
  }
  
  extend type Subscription {
    applicationCreated: ApplicationCreated!
  }

  type ApplicationCreated {
    application: Application!
  }
`;
