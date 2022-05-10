const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    bio: String
    rocks: [Rock]
    friends: [User]
  }

  type Rock {
    _id: ID
    name: String
    type: String
    description: String
    origin: String
    user: User
    dateCollected: String
    comments: [Comment]
  }

  type Comment {
    commentId: ID
    commentBody: String
    author: String
    createdAt: String
  }

  type Query {
    users: [User]!
    rocks: [Rock]!
    user(userId: ID!): User
    rock(rockId: ID!): Rock
    myprofile: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addRock(name: String!, description: String!, dateCollected: String!): Rock
    deleteRock (rockId: ID!): Rock
  }
`;

module.exports = typeDefs;
