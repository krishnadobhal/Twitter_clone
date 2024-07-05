import { graphql } from "../../gql";

export const verifyGoogleTokenQuery=graphql(`
    #graphql
    query verifyGoogleToken($token:String!){
        verifyGoogleToken(token:$token)
    }
`)