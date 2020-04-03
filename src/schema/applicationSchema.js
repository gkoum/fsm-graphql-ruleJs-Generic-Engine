import { gql } from 'apollo-server-express';
// applications(cursor: String, limit: Int): ApplicationConnection!
export default gql`
  extend type Query {
    applications: [Application]
    application(id: ID!): Application
    applicationHistory(id: ID!): [String]
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
    id: ID
    personalDetails: PersonalDetails
    title: Title
    titleConsideration: Title
    history: [String]
    user: User
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
    id: ID
    comments: String
  }
  
  extend type Subscription {
    applicationCreated: ApplicationCreated!
  }

  type ApplicationCreated {
    application: Application!
  }
`;
