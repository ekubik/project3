import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const NEW_USER = gql`
  mutation newUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    newUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ROCK = gql`
  mutation addRock(
    $name: String!
    $description: String!
    $dateCollected: String!
) {
    addRock(
      name: $name
      description: $description
      dateCollected: $dateCollected
    ) {
      _id
      name
      description
      user
      comments {
        commentId
        commentBody
        author
        createdAt
      }
    }
  }
`;

export const DELETE_ROCK = gql`
  mutation deleteRock($rockId: ID!) {
    deleteRock(rockId: $rockId) {
      _id
      name
    }
  }
`;
