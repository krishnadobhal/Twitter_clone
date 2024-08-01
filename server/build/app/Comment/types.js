"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql

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
`;
