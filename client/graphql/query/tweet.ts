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
export const GetTweetByIDQuery=graphql(`
  #grphql
  query GetTweetByID($id: String!) {
  getTweetByID(id: $id) {
    id
    content
    imageURL
    createdAt
    likeCount
    getLikes {
      id
    }
    author {
      profileImageURL
      id
      firstName
      lastName
    }
  }
}
`)

