export const types=`#graphql

    type User{
    id: ID!
    firstName:String!
    lastName:String
    email:String!
    profileImageURL:String

        follower:[User]
        following:[User]
        
    tweets:[Tweet]  
    }
`;