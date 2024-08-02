"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
    getAllTweets:[Tweet]
    getTweetById(id:ID!):Tweet
    getSignedUrlForTweet(imageName:String!,imageType:String!):String
    getTweetsByauthorID(id:String!):[Tweet]
`;
