/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    #graphql\n    mutation DislikeTweet($tweetId: String!) {\n        dislikeTweet(tweetId: $tweetId) {\n            id\n        }\n}\n    ": types.DislikeTweetDocument,
    "\n    #graphql\n    mutation LikeTweet($tweetId: String!) {\n        likeTweet(tweetId: $tweetId) {\n            id\n        }\n}\n    ": types.LikeTweetDocument,
    "\n    #graphql\n    mutation CreateTweet($payload:CreateTweetData!){\n        createTweet(payload:$payload){\n            id\n        }\n    }\n    ": types.CreateTweetDocument,
    "\n    #graphql\n    mutation DiscardImage($imageName: String!) {\n        discardImage(ImageName: $imageName)\n    }   \n": types.DiscardImageDocument,
    "\n#graphql\nmutation FollowUser($to: ID!) {\nfollowUser(to: $to)\n}\n    ": types.FollowUserDocument,
    "\n#graphql\nmutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n    ": types.UnfollowUserDocument,
    "\n    #graphql\n    query GetLikes($tweetId: String!) {\n        getLikes(tweetId: $tweetId) {\n            id\n        }\n    }\n": types.GetLikesDocument,
    "\n    #graphql\n    query GetAllTweets {\n      getAllTweets {\n        id\n        content\n        imageURL\n        createdAt\n        likeCount\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n        getLikes {\n          id\n        }\n  }\n}\n": types.GetAllTweetsDocument,
    "\n  #grphql\n  query GetSignedUrlForTweet($imageName: String!, $imageType: String!) {\n    getSignedUrlForTweet(imageName: $imageName, imageType: $imageType)\n  }\n": types.GetSignedUrlForTweetDocument,
    "\n  #grphql\n  query GetTweetByID($id: String!) {\n  getTweetByID(id: $id) {\n    id\n    content\n    imageURL\n    createdAt\n    likeCount\n    getLikes {\n      id\n    }\n    author {\n      profileImageURL\n      id\n      firstName\n      lastName\n    }\n  }\n}\n": types.GetTweetByIdDocument,
    "\n    #graphql\n    query verifyGoogleToken($token:String!){\n        verifyGoogleToken(token:$token)\n    }\n": types.VerifyGoogleTokenDocument,
    "\n    query GetCurrentUser {\n        getCurrentUser {\n            email\n            firstName\n            id\n            lastName\n            profileImageURL\n            follower{\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            following{\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            tweets {\n                imageURL\n                id\n                content\n                likeCount\n                author {\n                    id\n                    firstName\n                    profileImageURL\n                    lastName\n                }\n                getLikes {\n                    id\n                }\n            }\n        }\n    }\n": types.GetCurrentUserDocument,
    "\n    #graphql\n    query GetUserByid($id: ID!) {\n        getUserByid(id: $id) {\n            email\n            firstName\n            id\n            lastName\n            profileImageURL\n            follower{\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            following{\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            tweets {\n                imageURL\n                id\n                content\n                likeCount\n                author {\n                    id\n                    firstName\n                    profileImageURL\n                    lastName\n                }\n                getLikes {\n                    id\n                }\n            }\n        }\n    }\n": types.GetUserByidDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation DislikeTweet($tweetId: String!) {\n        dislikeTweet(tweetId: $tweetId) {\n            id\n        }\n}\n    "): (typeof documents)["\n    #graphql\n    mutation DislikeTweet($tweetId: String!) {\n        dislikeTweet(tweetId: $tweetId) {\n            id\n        }\n}\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation LikeTweet($tweetId: String!) {\n        likeTweet(tweetId: $tweetId) {\n            id\n        }\n}\n    "): (typeof documents)["\n    #graphql\n    mutation LikeTweet($tweetId: String!) {\n        likeTweet(tweetId: $tweetId) {\n            id\n        }\n}\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation CreateTweet($payload:CreateTweetData!){\n        createTweet(payload:$payload){\n            id\n        }\n    }\n    "): (typeof documents)["\n    #graphql\n    mutation CreateTweet($payload:CreateTweetData!){\n        createTweet(payload:$payload){\n            id\n        }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation DiscardImage($imageName: String!) {\n        discardImage(ImageName: $imageName)\n    }   \n"): (typeof documents)["\n    #graphql\n    mutation DiscardImage($imageName: String!) {\n        discardImage(ImageName: $imageName)\n    }   \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\nmutation FollowUser($to: ID!) {\nfollowUser(to: $to)\n}\n    "): (typeof documents)["\n#graphql\nmutation FollowUser($to: ID!) {\nfollowUser(to: $to)\n}\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\nmutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n    "): (typeof documents)["\n#graphql\nmutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetLikes($tweetId: String!) {\n        getLikes(tweetId: $tweetId) {\n            id\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetLikes($tweetId: String!) {\n        getLikes(tweetId: $tweetId) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetAllTweets {\n      getAllTweets {\n        id\n        content\n        imageURL\n        createdAt\n        likeCount\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n        getLikes {\n          id\n        }\n  }\n}\n"): (typeof documents)["\n    #graphql\n    query GetAllTweets {\n      getAllTweets {\n        id\n        content\n        imageURL\n        createdAt\n        likeCount\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n        getLikes {\n          id\n        }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #grphql\n  query GetSignedUrlForTweet($imageName: String!, $imageType: String!) {\n    getSignedUrlForTweet(imageName: $imageName, imageType: $imageType)\n  }\n"): (typeof documents)["\n  #grphql\n  query GetSignedUrlForTweet($imageName: String!, $imageType: String!) {\n    getSignedUrlForTweet(imageName: $imageName, imageType: $imageType)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #grphql\n  query GetTweetByID($id: String!) {\n  getTweetByID(id: $id) {\n    id\n    content\n    imageURL\n    createdAt\n    likeCount\n    getLikes {\n      id\n    }\n    author {\n      profileImageURL\n      id\n      firstName\n      lastName\n    }\n  }\n}\n"): (typeof documents)["\n  #grphql\n  query GetTweetByID($id: String!) {\n  getTweetByID(id: $id) {\n    id\n    content\n    imageURL\n    createdAt\n    likeCount\n    getLikes {\n      id\n    }\n    author {\n      profileImageURL\n      id\n      firstName\n      lastName\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query verifyGoogleToken($token:String!){\n        verifyGoogleToken(token:$token)\n    }\n"): (typeof documents)["\n    #graphql\n    query verifyGoogleToken($token:String!){\n        verifyGoogleToken(token:$token)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCurrentUser {\n        getCurrentUser {\n            email\n            firstName\n            id\n            lastName\n            profileImageURL\n            follower{\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            following{\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            tweets {\n                imageURL\n                id\n                content\n                likeCount\n                author {\n                    id\n                    firstName\n                    profileImageURL\n                    lastName\n                }\n                getLikes {\n                    id\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetCurrentUser {\n        getCurrentUser {\n            email\n            firstName\n            id\n            lastName\n            profileImageURL\n            follower{\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            following{\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            tweets {\n                imageURL\n                id\n                content\n                likeCount\n                author {\n                    id\n                    firstName\n                    profileImageURL\n                    lastName\n                }\n                getLikes {\n                    id\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetUserByid($id: ID!) {\n        getUserByid(id: $id) {\n            email\n            firstName\n            id\n            lastName\n            profileImageURL\n            follower{\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            following{\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            tweets {\n                imageURL\n                id\n                content\n                likeCount\n                author {\n                    id\n                    firstName\n                    profileImageURL\n                    lastName\n                }\n                getLikes {\n                    id\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetUserByid($id: ID!) {\n        getUserByid(id: $id) {\n            email\n            firstName\n            id\n            lastName\n            profileImageURL\n            follower{\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            following{\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            tweets {\n                imageURL\n                id\n                content\n                likeCount\n                author {\n                    id\n                    firstName\n                    profileImageURL\n                    lastName\n                }\n                getLikes {\n                    id\n                }\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;