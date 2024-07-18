import { prismaClient } from "../client/db"

export interface CreateTweetPayload{
    content:string
    imageURL?:string
    userId: string
}
export default class TweetService{
    public static CreateTweet(data:CreateTweetPayload){
        return prismaClient.tweet.create({
            data:{
                content:data.content,
                imageURL:data.imageURL,
                author :{connect:{id:data.userId}},
            }
        });
    }

    public static getAllTweets(){
        return prismaClient.tweet.findMany({orderBy:{createdAt:"desc"}})
    }
}