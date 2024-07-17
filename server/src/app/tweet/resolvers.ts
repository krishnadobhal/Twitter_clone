import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { Tweet } from "@prisma/client";
import {GraphqlContext} from "../../interface";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

interface CreateTweetPayload{
    content:string
    imageURL?:string
}

const s3Client=new S3Client({})

const queries ={
    getAllTweets:()=>
        prisma.tweet.findMany({orderBy:{createdAt:"desc"}}),

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
        Bucket: process.env.AWS_S3_BUCKET,
        ContentType: imageType,
        Key: `uploads/${ctx.user.id}/tweets/${imageName}-${Date.now()}`,
    });

    const signedURL = await getSignedUrl(s3Client, putObjectCommand);

    return signedURL;
        
    }
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

