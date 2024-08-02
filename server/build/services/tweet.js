"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const db_1 = require("../client/db");
const prisma = new client_1.PrismaClient();
class TweetService {
    static CreateTweet(data) {
        return db_1.prismaClient.tweet.create({
            data: {
                content: data.content,
                imageURL: data.imageURL,
                author: { connect: { id: data.userId } },
            }
        });
    }
    static getAllTweets() {
        return db_1.prismaClient.tweet.findMany({ orderBy: { createdAt: "desc" } });
    }
    static getTweetById(id) {
        return prisma.tweet.findUnique({
            where: {
                id
            },
            include: {
                comment: {
                    include: {
                        user: true
                    }, orderBy: {
                        createdAt: "desc"
                    }
                },
            },
        });
    }
}
exports.default = TweetService;
