"use strict";
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
    createComment: (_parent_1, _a, ctx_1) => __awaiter(void 0, [_parent_1, _a, ctx_1], void 0, function* (_parent, { tweetId, content }, ctx) {
        var _b;
        const user = (_b = ctx.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!user)
            throw new Error("You are not authenticated");
        try {
            yield prisma.comment.create({
                data: {
                    content,
                    tweet: { connect: { id: tweetId } },
                },
            });
            return true;
        }
        catch (e) {
            console.log("error in resolver", e);
            return false;
        }
    })
};
exports.resolver = { mutation };
