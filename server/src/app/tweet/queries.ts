export const queries=`#graphql
    getAllTweets:[Tweet]
    getTweetById(id:ID!):Tweet
    getSignedUrlForTweet(imageName:String!,imageType:String!):String
    getTweetByID(id:String!):[Tweet]
`