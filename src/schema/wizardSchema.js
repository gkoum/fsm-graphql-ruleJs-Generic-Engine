import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    wizard: Wizard!
  }

  extend type Mutation {
    updateWizard(wizard: wizard!): Wizard
    wizardEvent(name: String!, description: String, body: [pair], numberOfPairs: Int): State
  }

  input wizard {
    states: [state]!
    transitions: [String]!
    events: [event]!
  }

  type Wizard {
    states: [State]!
    transitions: [String]!
    events: [Event]!
  }
  input pair {
    name: String,
    value: String
  }
`
