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
    ui: [[String]]
    title: String
    label: String
    id: String
    name: String!
    description: String
    params: params
  }

  input params {
    ui: [[String]]
    x: Int
    y: Int
    lane: String
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
  # for a REST API: create a standard API with everything and use fsmSchema to validate...

  # only fsmObject and not specifics should be used
  # has to do with the request for each fsm transition
  # request: {
  #   hasStructure: {} -> must include all of them as possible in each mutation-POST Event
  #   hasValue: {},
  # },
  input requestBody {
    fsmObjectId: ID!,
    requestBody: String!,
    user: user
  }

  input user {
    id: ID!,
    name: String,
    role: String
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
  # only fsmObject and not specifics should be used
  # has to do with the response for each fsm transition
  # response: {
  #   hasStructure: {} -> must include all of them as possible in each mutation-POST Event
  #   hasValue: {},
  # },
  type responseBody {
    message: String,
    name: String!,
    judgment: String,
    fsmObjectId: ID,
    roleId: ID
    currentState: String
    newState: String
    error: String
  }

  type Event {
    name: String!
    description: String
    body: String
  }

  type Fsm {
    roles: [Roles]
    states: [State]!
    transitions: [String]!
    events: [Event]!
    services: String
  }

  type Roles {
    name: String,
    hasAccess: [String],
    events: [String]
  }

  type State {
    ui: [[String]]
    title: String
    label: String
    id: String
    name: String!
    description: String
    params: Params
  }

  type Params {
    x: Int
    y: Int
    ui: [[String]]
    lane: String
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
