"use strict";
// resolvers.ts or similar file
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolver = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const mutation = {
    likeTweet: (_parent_1, _a, ctx_1) => __awaiter(void 0, [_parent_1, _a, ctx_1], void 0, function* (_parent, { tweetId }, ctx) {
        var _b, _c;
        const userId = (_b = ctx.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!userId)
            throw new Error("You are not authenticated");
        yield prisma.like.create({
            data: {
                User: { connect: { id: (_c = ctx.user) === null || _c === void 0 ? void 0 : _c.id } },
                tweet: { connect: { id: tweetId } }
            },
        });
        // Increase the like count on the tweet
        const updatedTweet = yield prisma.tweet.update({
            where: { id: tweetId },
            data: { likeCount: { increment: 1 } },
        });
        return updatedTweet;
    }),
    dislikeTweet: (_parent_1, _a, ctx_1) => __awaiter(void 0, [_parent_1, _a, ctx_1], void 0, function* (_parent, { tweetId }, ctx) {
        var _b;
        const userId = (_b = ctx.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!userId)
            throw new Error("You are not authenticated");
        const likeRecord = yield prisma.like.findUnique({
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
        yield prisma.like.delete({
            where: {
                tweetId_UserID: {
                    tweetId,
                    UserID: userId,
                },
            },
        });
        const updatedTweet = yield prisma.tweet.update({
            where: { id: tweetId },
            data: { likeCount: { decrement: 1 } },
        });
        return updatedTweet;
    })
};
const queries = {
    getLikes: (_parent_1, _a, ctx_1) => __awaiter(void 0, [_parent_1, _a, ctx_1], void 0, function* (_parent, { tweetId }, ctx) {
        var _b;
        const userId = (_b = ctx.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!userId)
            throw new Error("You are not authenticated");
        const likes = yield prisma.like.findMany({
            where: { tweetId },
            include: { User: true }
        });
        return likes.map(like => like.User);
    })
};
exports.resolver = { mutation, queries };
