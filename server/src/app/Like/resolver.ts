// resolvers.ts or similar file

import { PrismaClient } from '@prisma/client';
import { GraphqlContext } from '../../interface';
const prisma = new PrismaClient();

const mutation = {
    likeTweet: async (_parent: any, { tweetId }: { tweetId: string }, ctx: GraphqlContext) => {
        const userId = ctx.user?.id;
        if (!userId) throw new Error("You are not authenticated");

        await prisma.like.create({
            data: {
                User: { connect: { id: ctx.user?.id } },
                tweet: { connect: { id: tweetId } }
            },
        });

        // Increase the like count on the tweet
        const updatedTweet = await prisma.tweet.update({
            where: { id: tweetId },
            data: { likeCount: { increment: 1 } },
        });

        return updatedTweet;
    },
    dislikeTweet: async (_parent: any, { tweetId }: { tweetId: string }, ctx: GraphqlContext) => {
        const userId = ctx.user?.id;
        if (!userId) throw new Error("You are not authenticated");

        const likeRecord = await prisma.like.findUnique({
            where: {
                tweetId_UserID: {
                    tweetId,
                    UserID: userId,
                },
            },
        });
    
        if (!likeRecord) {
            throw new Error("You haven't liked this tweet");
        }
    
        await prisma.like.delete({
            where: {
                tweetId_UserID: {
                    tweetId,
                    UserID: userId,
                },
            },
        });

        const updatedTweet = await prisma.tweet.update({
            where: { id: tweetId },
            data: { likeCount: { decrement: 1 } },
        });

        return updatedTweet;
    }
};

const queries={
    getLikes:async(_parent: any, { tweetId }: { tweetId: string }, ctx: GraphqlContext)=>{
        const userId = ctx.user?.id;
        if (!userId) throw new Error("You are not authenticated");

        const likes = await prisma.like.findMany({
            where: { tweetId },
            include:{User:true}
        });
        return likes.map(like => like.User);
    }
}

export const resolver = { mutation,queries };
