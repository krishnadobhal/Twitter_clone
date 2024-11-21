import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { Tweet } from "@prisma/client";
import {GraphqlContext} from "../../interface";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand,DeleteObjectCommand } from "@aws-sdk/client-s3";
import UserService from '../../services/user';
import TweetService, { CreateTweetPayload } from '../../services/tweet';
import { prismaClient } from '../../client/db';
import * as dotenv from "dotenv"

dotenv.config()

const s3Client=new S3Client({
    region:"ap-south-1"
})

const queries ={
    getAllTweets:()=>
        TweetService.getAllTweets() ,

    getTweetById:async(parent:any, {id}:{id:string} ) =>TweetService.getTweetById(id),

    getSignedUrlForTweet:async(parent:any,{imageType,imageName}:{imageType:string,imageName:string},ctx:GraphqlContext)=>{
        if (!ctx.user || !ctx.user.id) throw new Error("Unauthenticated");
    const allowedImageTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/webp",
    ];

    if (!allowedImageTypes.includes(imageType))
        throw new Error("Unsupported Image Type");

    const putObjectCommand = new PutObjectCommand({
        Bucket: "twitter-krishna",
        ContentType: imageType,
        Key: `uploads/${ctx.user.id}/tweets/${imageName}-${ctx.user.createdAt}`,
    });

    const signedURL = await getSignedUrl(s3Client, putObjectCommand);

    return signedURL;
        
    },
    getTweetsByauthorID:async(parent:any,{id}:{id:string},ctx:GraphqlContext)=>{
        console.log(`TweeByID=> ${ctx.user}`)

        return prismaClient.tweet.findMany({
            where: {
                authorId: id
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }
}

const mutations={
    createTweet:async(parent:any,{payload}:{payload:CreateTweetPayload},ctx:GraphqlContext) =>{
        if(!ctx.user) throw new Error("You are not authenticated");
        const tweet= await TweetService.CreateTweet({
            ...payload,
            userId:ctx.user.id,
        })
        return tweet;
    },
    discardImage:async(parent:any,{ImageName}:{ImageName:string},ctx:GraphqlContext)=>{
        const deleteObjectCommand = new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `uploads/${ctx.user?.id}/tweets/${ImageName}-${ctx.user?.createdAt}`,
        });
        console.log(`uploads/${ctx.user?.id}/tweets/${ImageName}-${ctx.user?.createdAt}`);
        
        try {
            await s3Client.send(deleteObjectCommand);
            console.log(`Successfully deleted `);
        } catch (error) {
            console.error("Error deleting object:", error);
        }
        return true
    }
}

const extraResolvers={
    Tweet:{
        author:(parent:Tweet)=>UserService.getUserById(parent.authorId),
        likeCount: (parent: Tweet) => prisma.like.count({ where: { tweetId: parent.id } }),
        getLikes: async (parent: Tweet) => {
            const likes = await prisma.like.findMany({
                where: { tweetId: parent.id },
                include: { User: true }
            });
            return likes.map(like => like.User);
        }
    }
}



export const resolvers ={mutations,extraResolvers,queries};

