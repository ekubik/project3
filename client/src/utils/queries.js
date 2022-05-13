import { gql } from "@apollo/client";

export const QUERY_ALL_ROCKS = gql`
  query getRocks {
    rocks {
      _id
      name
      description
      user
    }
  }
`;

export const QUERY_SINGLE_ROCK = gql`
  query getSingleRock($rockId: ID!) {
    rock(rockId: $rockId) {
      _id
      name
      type
      origin
      description
      user
      dateCollected
      comments {
        commentId
        commentBody
        author
        createdAt
      }
    }
  }
`;

export const QUERY_MY_PROFILE = gql`
  query myprofile {
    myprofile {
      _id
      firstName
      lastName
      username
      email
      bio
      rocks {
        _id
        name
        type
        origin
        description
        user
        dateCollected
        comments {
          commentId
          commentBody
          author
          createdAt
        }
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      rocks {
        _id
        name
        user
        dateCollected
      }
    }
  }
`;
