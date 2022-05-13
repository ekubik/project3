import {gql} from "@apollo/client";

export const QUERY_ALL_ROCKS = gql `
query getRocks {
    rocks {
        _id
        name
        description
        user
    }
}`

export const QUERY_SINGLE_ROCK = gql `
query getSingleRock($rockId:ID!) {
    rock (rockId: $rockId) {
        _id
        name
        type
        origin
        description
        user
        dateCollected
        comments {
            _id
            commentBody
            author
            createdAt
        }
    }
}`;