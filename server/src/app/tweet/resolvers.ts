import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { Tweet } from "@prisma/client";
import {GraphqlContext} from "../../interface";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand,DeleteObjectCommand } from "@aws-sdk/client-s3";
import UserService from '../../services/user';
import TweetService, { CreateTweetPayload } from '../../services/tweet';



const s3Client=new S3Client({
    region:process.env.AWS_DEFAULT_REGION
})

const queries ={
    getAllTweets:()=>
        TweetService.getAllTweets() ,

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
        Key: `uploads/${ctx.user.id}/tweets/${imageName}-${ctx.user.createdAt}`,
    });

    const signedURL = await getSignedUrl(s3Client, putObjectCommand);

    return signedURL;
        
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
        author:(parent:Tweet)=>UserService.getUserById(parent.authorId)
    }
}



export const resolvers ={mutations,extraResolvers,queries};

