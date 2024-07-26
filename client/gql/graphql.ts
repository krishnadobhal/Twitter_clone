/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTweetData = {
  content: Scalars['String']['input'];
  imageURL?: InputMaybe<Scalars['String']['input']>;
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  tweet: Tweet;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTweet?: Maybe<Tweet>;
  discardImage?: Maybe<Scalars['Boolean']['output']>;
  dislikeTweet: Tweet;
  followUser?: Maybe<Scalars['Boolean']['output']>;
  likeTweet: Tweet;
  unfollowUser?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateTweetArgs = {
  payload: CreateTweetData;
};


export type MutationDiscardImageArgs = {
  ImageName: Scalars['String']['input'];
};


export type MutationDislikeTweetArgs = {
  tweetId: Scalars['String']['input'];
};


export type MutationFollowUserArgs = {
  to: Scalars['ID']['input'];
};


export type MutationLikeTweetArgs = {
  tweetId: Scalars['String']['input'];
};


export type MutationUnfollowUserArgs = {
  to: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllTweets?: Maybe<Array<Maybe<Tweet>>>;
  getCurrentUser?: Maybe<User>;
  getLikes: Array<User>;
  getSignedUrlForTweet?: Maybe<Scalars['String']['output']>;
  getUserByid?: Maybe<User>;
  verifyGoogleToken?: Maybe<Scalars['String']['output']>;
};


export type QueryGetLikesArgs = {
  tweetId: Scalars['String']['input'];
};


export type QueryGetSignedUrlForTweetArgs = {
  imageName: Scalars['String']['input'];
  imageType: Scalars['String']['input'];
};


export type QueryGetUserByidArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVerifyGoogleTokenArgs = {
  token: Scalars['String']['input'];
};

export type Tweet = {
  __typename?: 'Tweet';
  author?: Maybe<User>;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  getLikes: Array<User>;
  id: Scalars['ID']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  likeCount: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  follower?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  profileImageURL?: Maybe<Scalars['String']['output']>;
  tweets?: Maybe<Array<Maybe<Tweet>>>;
};

export type DislikeTweetMutationVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type DislikeTweetMutation = { __typename?: 'Mutation', dislikeTweet: { __typename?: 'Tweet', id: string } };

export type LikeTweetMutationVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type LikeTweetMutation = { __typename?: 'Mutation', likeTweet: { __typename?: 'Tweet', id: string } };

export type CreateTweetMutationVariables = Exact<{
  payload: CreateTweetData;
}>;


export type CreateTweetMutation = { __typename?: 'Mutation', createTweet?: { __typename?: 'Tweet', id: string } | null };

export type DiscardImageMutationVariables = Exact<{
  imageName: Scalars['String']['input'];
}>;


export type DiscardImageMutation = { __typename?: 'Mutation', discardImage?: boolean | null };

export type FollowUserMutationVariables = Exact<{
  to: Scalars['ID']['input'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser?: boolean | null };

export type UnfollowUserMutationVariables = Exact<{
  to: Scalars['ID']['input'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser?: boolean | null };

export type GetLikesQueryVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type GetLikesQuery = { __typename?: 'Query', getLikes: Array<{ __typename?: 'User', id: string }> };

export type GetAllTweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTweetsQuery = { __typename?: 'Query', getAllTweets?: Array<{ __typename?: 'Tweet', id: string, content: string, imageURL?: string | null, createdAt: string, likeCount: number, author?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null } | null, getLikes: Array<{ __typename?: 'User', id: string }> } | null> | null };

export type GetSignedUrlForTweetQueryVariables = Exact<{
  imageName: Scalars['String']['input'];
  imageType: Scalars['String']['input'];
}>;


export type GetSignedUrlForTweetQuery = { __typename?: 'Query', getSignedUrlForTweet?: string | null };

export type VerifyGoogleTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyGoogleTokenQuery = { __typename?: 'Query', verifyGoogleToken?: string | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', email: string, firstName: string, id: string, lastName?: string | null, profileImageURL?: string | null, follower?: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null } | null> | null, following?: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null } | null> | null, tweets?: Array<{ __typename?: 'Tweet', imageURL?: string | null, id: string, content: string, author?: { __typename?: 'User', id: string, firstName: string, profileImageURL?: string | null, lastName?: string | null } | null } | null> | null } | null };

export type GetUserByidQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserByidQuery = { __typename?: 'Query', getUserByid?: { __typename?: 'User', id: string, firstName: string, email: string, profileImageURL?: string | null, follower?: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null } | null> | null, following?: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null } | null> | null, tweets?: Array<{ __typename?: 'Tweet', imageURL?: string | null, content: string, id: string, author?: { __typename?: 'User', firstName: string, lastName?: string | null, profileImageURL?: string | null } | null } | null> | null } | null };


export const DislikeTweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DislikeTweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dislikeTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DislikeTweetMutation, DislikeTweetMutationVariables>;
export const LikeTweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeTweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LikeTweetMutation, LikeTweetMutationVariables>;
export const CreateTweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTweetData"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTweetMutation, CreateTweetMutationVariables>;
export const DiscardImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DiscardImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discardImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ImageName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageName"}}}]}]}}]} as unknown as DocumentNode<DiscardImageMutation, DiscardImageMutationVariables>;
export const FollowUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}]}]}}]} as unknown as DocumentNode<FollowUserMutation, FollowUserMutationVariables>;
export const UnfollowUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnfollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unfollowUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}]}]}}]} as unknown as DocumentNode<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const GetLikesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLikes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLikes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetLikesQuery, GetLikesQueryVariables>;
export const GetAllTweetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getLikes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTweetsQuery, GetAllTweetsQueryVariables>;
export const GetSignedUrlForTweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSignedUrlForTweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSignedUrlForTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"imageName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageName"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageType"}}}]}]}}]} as unknown as DocumentNode<GetSignedUrlForTweetQuery, GetSignedUrlForTweetQueryVariables>;
export const VerifyGoogleTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"verifyGoogleToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyGoogleToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<VerifyGoogleTokenQuery, VerifyGoogleTokenQueryVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserByidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserByid"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByidQuery, GetUserByidQueryVariables>;