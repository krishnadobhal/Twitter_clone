import { graphql } from "../../gql";

export const createTweetMutation=graphql(`
    #graphql
    mutation CreateTweet($payload:CreateTweetData!){
        createTweet(payload:$payload){
            id
        }
    }
    `)

export const discardImageMutation=graphql(`
    #graphql
    mutation DiscardImage($imageName: String!) {
        discardImage(ImageName: $imageName)
    }   
`)