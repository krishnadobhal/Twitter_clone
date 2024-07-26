import { graphql } from "../../gql";

export const DislikeTweetMutation=graphql(`
    #graphql
    mutation DislikeTweet($tweetId: String!) {
        dislikeTweet(tweetId: $tweetId) {
            id
        }
}
    `)
export const LikeTweetMutation=graphql(`
    #graphql
    mutation LikeTweet($tweetId: String!) {
        likeTweet(tweetId: $tweetId) {
            id
        }
}
    `)