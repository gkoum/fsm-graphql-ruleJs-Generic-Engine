import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    event(name: String!): Event
    events: [Event!]
    transitions: [Transition!]
    transition(name: String!): Transition
    fsm: Fsm!
  }

  extend type Mutation {
    updateFsm(fsm: fsm!): Fsm
    event(name: String!, body: requestBody): responseBody
    events: [Event!]
    createTransition(name: String!, body: String!): Transition!
    deleteTransition(name: String!): Transition!
  }

  input fsm {
    states: [state]!
    transitions: [String]!
    events: [event]!
  }

  input event {
    name: String!
    description: String
    body: String
  }

  input state {
    name: String!,
    description: String
    params: params
  }

  input params {
    x: Int
    y: Int
  }

  input transition {
    name: String!
    description: String
    from: String
    to: String
    atEvent: String
    precondition: String
    effects: String
  }

  input precondition {
    description: String,
    request: request
    services: [service]
  }

  input service {
    name: String!
  }

  input request {
    name: String
  }

  input effect {
    description: String
  }

  input requestBody {
    applicationId: ID,
    judgment: judgement,
    application: application
    roleId: ID
  }

  input application {
    id: ID!
    personalDetails: personalDetails
    title: title
    titleConsideration: title
    history: history
  }

  input personalDetails {
    id: ID!
    name: String
    surname: String
  }

  input title {
    id: ID!
    university: String
  }

  input history {
    id: ID!
    judgement: String
  }

  type responseBody {
    name: String!,
    judgment: String,
    applicationId: ID,
    roleId: ID
    newState: String
  }

  type Event {
    name: String!
    description: String
    body: String
  }

  input judgement {
    pending: Boolean
    sameTitle: Boolean
  }

  type Fsm {
    states: [State]!
    transitions: [String]!
    events: [Event]!
  }

  type State {
    name: String!,
    description: String!
    params: Params
  }

  type Params {
    x: Int
    y: Int
  }

  type Transition {
    name: String!,
    description: String!
    from: String!,
    to: String!,
    atEvent: String!,
    precondition: Precondition
    effect: Effect
  }

  type Precondition {
    request: Request
    services: [Service]
    servicesRules: String
  }

  type Effect {
    response: Response
    services: [Service]
    servicesRules: String
  }

  type Service {
    name: String!
  }
  
  type Request {
    hasStructure: String
    hasValue: String
  }

  type Response {
    hasStructure: String
    hasValue: String
  }
`
