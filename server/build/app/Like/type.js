"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql
    type Like {
        id: String!
        user: User!
        tweet: Tweet!
        createdAt: String!
    }
`;
