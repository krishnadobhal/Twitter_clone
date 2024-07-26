import {graphql} from "../../gql";

export const getLikesQuery=graphql(`
    #graphql
    query GetLikes($tweetId: String!) {
        getLikes(tweetId: $tweetId) {
            id
        }
    }
`);