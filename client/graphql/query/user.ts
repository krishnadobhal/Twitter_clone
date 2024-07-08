import { graphql } from "../../gql";

export const verifyGoogleTokenQuery=graphql(`
    #graphql
    query verifyGoogleToken($token:String!){
        verifyGoogleToken(token:$token)
    }
`)
export const getCurrentUserQuery = graphql(`
    query GetCurrentUser {
        getCurrentUser {
            email
            firstName
            id
            lastName
            profileImageURL
        }
    }
`);

