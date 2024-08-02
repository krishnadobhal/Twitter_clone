import { PrismaClient } from "@prisma/client";
import { GraphqlContext } from "../../interface";
import { prismaClient } from "../../client/db";
const prisma=new PrismaClient();

interface CreateTweetPayload{
    content: string
    tweetId :string
}
const mutation={
    createComment:async(_parent:any,{payload}:{payload:CreateTweetPayload},ctx:GraphqlContext)=>{
        const user=ctx.user?.id;
        console.log(user);
        
            if (!user) throw new Error("You are not authenticated");

            try{

                await prismaClient.comment.create({
                    data:{
                        tweet:{connect:{id:payload.tweetId}},
                        content:payload.content,
                        user:{connect:{id:user}}
                    },
                })
                
                  return true;
            }catch(e){
                    console.log("error in resolver",e);
                    throw new Error("You are not authenticated");
                    return false;
                    
            }
    }
}

export const resolver={mutation}