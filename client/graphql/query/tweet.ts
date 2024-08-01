import {graphql} from "../../gql";

export const getAllTweetsQuery=graphql(`
    #graphql
    query GetAllTweets {
      getAllTweets {
        id
        content
        imageURL
        createdAt
        likeCount
        author {
          id
          firstName
          lastName
          profileImageURL
        }
        getLikes {
          id
        }
  }
}
`);

export const GetSignedUrlForTweetQuery=graphql(`
  #grphql
  query GetSignedUrlForTweet($imageName: String!, $imageType: String!) {
    getSignedUrlForTweet(imageName: $imageName, imageType: $imageType)
  }
`)


export const getTweetByIdQuery=graphql(`
  #graphql
  query GetTweetById($getTweetByIdId: ID!) {
  getTweetById(id: $getTweetByIdId) {
    id
    content
    imageURL
    author {
      email
      firstName
      lastName
      profileImageURL
    }
    
    comment {
      content
      createdAt
      id
      tweetId
      user {
        firstName
        lastName
        profileImageURL
      }
  }
  }
}
  `)

