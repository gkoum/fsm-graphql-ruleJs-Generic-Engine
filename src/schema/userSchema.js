import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Token!

    signIn(login: String!, password: String!): Token!
    updateUser(username: String!): User!
    deleteUser(id: ID!): Boolean!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    name: String!
    firstname: String!
    surname: String
    gender: String
    applications: [Application!]
    fathersName: String
    mothersName: String
    birthdate: String
    countryId: ID
    addressArea: String
    addressCity: String
    addressStreet: String
    addressZipcode: String
    mobilePhone: String
    email: String
    adtNo: String
    afm: String
    password: String
    rememberToken: String
    createdAt: String
    updateAt: String
    visa: String
    fromVisa: String
    toVisa: String
    landline: String
    countryOfBirthId: ID
    cityOfBirth: String
    bidx: String
    foreignIdNum: String
    foreignIdCountry: String
    foreignerbidx: String
    bidxBirthdate: String
  }
`;
