import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { Tweet } from "@prisma/client";
import {GraphqlContext} from "../../interface";

interface CreateTweetPayload{
     content:string
    imageURL?:string
}

const queries ={
    getAllTweets:()=>
        prisma.tweet.findMany({orderBy:{createdAt:"desc"}})
}

const mutations={
    createTweet:async(
        parent:any,{payload}:{payload:CreateTweetPayload},ctx:GraphqlContext
    ) =>{
        if(!ctx.user) throw new Error("You are not authenticated");
       const tweet= await prisma.tweet.create({
            data:{
                content:payload.content,
                imageURL:payload.imageURL,
                author :{connect:{id:ctx.user.id}},
            }
        });
        return tweet;
    }
}

const extraResolvers={
    Tweet:{
        author:(parent:Tweet)=>prisma.user.findUnique({where:{id:parent.authorId}})
    }
}



export const resolvers ={mutations,extraResolvers,queries};