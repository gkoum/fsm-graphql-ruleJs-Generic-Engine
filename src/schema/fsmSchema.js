import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    event(name: String!): Event
    events: [Event!]
    transitions: [Transition!]
    transition(name: String!): Transition
  }

  extend type Mutation {
    event(name: String!, body: requestBody): responseBody
    events: [Event!]
    createTransition(name: String!, body: String!): Transition!
    deleteTransition(name: String!): Transition!
  }

  input requestBody {
    applicationId: ID!,
    judgment: judgement!,
    userId: ID!,
    roleId: ID!
  }

  type responseBody {
    name: String!,
    judgment: String,
    applicationId: ID,
    userId: ID,
    roleId: ID
  }

  type Event {
    name: String!
    description: String
  }

  input judgement {
    pending: Boolean!
  }

  type Fsm {
    states: [State]!
    transitions: [Transition]!
    events: [Event]!
  }

  type State {
    name: String!,
    description: String!
  }

  type Transition {
    name: String!,
    description: String!
    from: String!,
    to: String!,
    atEvent: String!,
    preconditions: [precondition]
    effects: [Effect]
  }

  type precondition {
    description: String,
    request: request
    services: [service]
  }

  type Effect {
    description: String
  }

  type service {
    name: String!
  }
  
  type request {
    name: String
  }
`
