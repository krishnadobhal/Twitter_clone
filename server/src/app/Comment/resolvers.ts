import { PrismaClient } from "@prisma/client";
import { GraphqlContext } from "../../interface";
const prisma=new PrismaClient();
const mutation={
    createComment:async(_parent:any,{tweetId,content}:{tweetId:string,content:string},ctx:GraphqlContext)=>{
        const user=ctx.user?.id;
            if (!user) throw new Error("You are not authenticated");

            try{

                await prisma.comment.create({
                
                    data:{
                        content,
                        tweet:{connect:{id:tweetId}},
                    },
                })
                
                  return true;
            }catch(e){
                    console.log("error in resolver",e);
                    return false;
                    
            }
    }
}

export const resolver={mutation}