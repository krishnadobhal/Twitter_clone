
export const types=`#graphql

input CreateCommentData{
        tweetId:String!
        content:String!
       }

 type Comment {
   id: ID!
   tweetId: String!
   content: String!
   createdAt: String!
   user: User!
 }
`