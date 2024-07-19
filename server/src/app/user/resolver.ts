import axios from 'axios'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import JWTService from '../../services/jwt';
import { GraphqlContext } from '../../interface';
import { User } from '@prisma/client';
import UserService from '../../services/user';
import { prismaClient } from '../../client/db';

const queries = {
    verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
        // console.log(token)
        const resultToken=await UserService.verifyGoogleAuthToken(token);
       return resultToken;
    },
    getCurrentUser :async(parent:any, args:any , ctx:GraphqlContext)=>{
        // console.log(ctx)
        const id=ctx.user?.id
        if(!id) return null;
        const user= await UserService.getUserById(id);
        return user;
    },
    getUserByid: async(parent:any, {id}:{id:string} , ctx:GraphqlContext)=>UserService.getUserById(id),
    
};

const extraResolvers={
    User:{
        tweets: (parent:User)=>prisma.tweet.findMany({where:{author:{id:parent.id}}}),
        follower:async(parent:User)=>{
           const result =await prisma.follows.findMany({
                where:{following:{id:parent.id}},
                include:{
                    follower:true
                }
            })
            
             return result.map(el=>el.follower);

        
        },
        following:async(parent:User)=>{
           const result= await prisma.follows.findMany({
                where:{follower:{id:parent.id}},
                 include:{
                     following:true,
                 }
            })
        
        
            return result.map(el=>el.following);
            //console.log(result);
        }

    }
}

const mutations={
    followUser:async(
        parent :any ,{to}:{to:string},ctx:GraphqlContext
    )=>{
        if(!ctx.user || !ctx.user.id) throw new Error("unauthenticated");
        await UserService.followUser(ctx.user.id,to);
        return true;
    },

    unfollowUser:async(
        parent:any,{to}:{to:string},ctx:GraphqlContext
    )=>{
        if(!ctx.user || !ctx.user.id) throw new Error("unauthenticated");
        await UserService.unfollowUser(ctx.user.id,to);
        return true;
    }
};

export const resolvers = { queries , extraResolvers,mutations};