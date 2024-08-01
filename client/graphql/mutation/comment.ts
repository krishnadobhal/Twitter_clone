import { graphql } from "../../gql"

export const createCommentMutation=graphql(`
    #graphql
    mutation CreateComment($payload:CreateCommentData!) {
     createComment(payload:$payload)
    }

     `)

//   mutation CreateComment($tweetId:String!){
//      createComment(tweetId:$tweetId){
//          id
//      }
//   }