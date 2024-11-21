"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_1 = require("@aws-sdk/client-s3");
const user_1 = __importDefault(require("../../services/user"));
const tweet_1 = __importDefault(require("../../services/tweet"));
const db_1 = require("../../client/db");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const s3Client = new client_s3_1.S3Client({
    region: "ap-south-1"
});
const queries = {
    getAllTweets: () => tweet_1.default.getAllTweets(),
    getTweetById: (parent_1, _a) => __awaiter(void 0, [parent_1, _a], void 0, function* (parent, { id }) { return tweet_1.default.getTweetById(id); }),
    getSignedUrlForTweet: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { imageType, imageName }, ctx) {
        if (!ctx.user || !ctx.user.id)
            throw new Error("Unauthenticated");
        const allowedImageTypes = [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/webp",
        ];
        if (!allowedImageTypes.includes(imageType))
            throw new Error("Unsupported Image Type");
        const putObjectCommand = new client_s3_1.PutObjectCommand({
            Bucket: "twitter-krishna",
            ContentType: imageType,
            Key: `uploads/${ctx.user.id}/tweets/${imageName}-${ctx.user.createdAt}`,
        });
        const signedURL = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, putObjectCommand);
        return signedURL;
    }),
    getTweetsByauthorID: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { id }, ctx) {
        console.log(`TweeByID=> ${ctx.user}`);
        return db_1.prismaClient.tweet.findMany({
            where: {
                authorId: id
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    })
};
const mutations = {
    createTweet: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { payload }, ctx) {
        if (!ctx.user)
            throw new Error("You are not authenticated");
        const tweet = yield tweet_1.default.CreateTweet(Object.assign(Object.assign({}, payload), { userId: ctx.user.id }));
        return tweet;
    }),
    discardImage: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { ImageName }, ctx) {
        var _b, _c, _d, _e;
        const deleteObjectCommand = new client_s3_1.DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `uploads/${(_b = ctx.user) === null || _b === void 0 ? void 0 : _b.id}/tweets/${ImageName}-${(_c = ctx.user) === null || _c === void 0 ? void 0 : _c.createdAt}`,
        });
        console.log(`uploads/${(_d = ctx.user) === null || _d === void 0 ? void 0 : _d.id}/tweets/${ImageName}-${(_e = ctx.user) === null || _e === void 0 ? void 0 : _e.createdAt}`);
        try {
            yield s3Client.send(deleteObjectCommand);
            console.log(`Successfully deleted `);
        }
        catch (error) {
            console.error("Error deleting object:", error);
        }
        return true;
    })
};
const extraResolvers = {
    Tweet: {
        author: (parent) => user_1.default.getUserById(parent.authorId),
        likeCount: (parent) => prisma.like.count({ where: { tweetId: parent.id } }),
        getLikes: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const likes = yield prisma.like.findMany({
                where: { tweetId: parent.id },
                include: { User: true }
            });
            return likes.map(like => like.User);
        })
    }
};
exports.resolvers = { mutations, extraResolvers, queries };
