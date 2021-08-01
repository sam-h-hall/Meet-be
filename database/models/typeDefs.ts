import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type loginSuccess {
    user: User
    token: String!
  }
  type Query {
    hello: String!
  }
  type User {
    _id: String!
    username: String!
    email: String!
    password: String
  }
  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      passwordRpt: String!
    ): loginSuccess
    login(username: String!, password: String!): loginSuccess!
  }
`;
