export const queries=`#graphql
    getAllTweets:[Tweet]
    getSignedUrlForTweet(imageName:String!,imageType:String!):String
    getTweetByID(id:String!):[Tweet]
`