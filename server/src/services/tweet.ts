import { PrismaClient } from "@prisma/client"
import { prismaClient } from "../client/db"
const prisma=new PrismaClient();

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
     
    public static getTweetById(id:string){
        return prisma.tweet.findUnique(
            {
                where:{
                    id
                },
            include:{
                comment:{
                    include:{
                        user:true
                    },orderBy:{
                        createdAt:"desc"
                    }
                },
        },})
    }
}