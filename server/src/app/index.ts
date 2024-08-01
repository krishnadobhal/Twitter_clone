import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import {User} from './user'
import JWTService from '../services/jwt';
import { GraphqlContext } from '../interface';
import {Tweet} from "./tweet";
import {Like} from "./Like"
import { Comment } from './Comment';


export async function initServer() {
    const app=express();
    app.use(cors())
    app.use(bodyParser.json())

    const graphqlServer = new ApolloServer<GraphqlContext>({ 
        typeDefs:`
            ${User.types}
            ${Tweet.types}
            ${Like.types}
            ${Comment.types}

            type Query{
                ${User.queries}
                ${Tweet.queries}
                ${Like.queries}
            }
            
            type Mutation{
            ${Tweet.mutations}
            ${User.mutations}
            ${Like.mutations}
            ${Comment.mutation}
            }
        `, 
        resolvers :{
            Query:{
                ...User.resolvers.queries,
                ...Tweet.resolvers.queries,
                ...Like.resolver.queries
            },
            Mutation:{
                ...Tweet.resolvers.mutations,
                ...User.resolvers.mutations,
                ...Like.resolver.mutation,
                ...Comment.resolver.mutation
            },
            ...Tweet.resolvers.extraResolvers,
            ...User.resolvers.extraResolvers,
        }
    })

    await graphqlServer.start(); 

    app.use('/graphql', expressMiddleware(graphqlServer,{
        context:async ({req,res})=> {
            return{
                user: req.headers.authorization ? JWTService.decodeToken(req.headers.authorization.split("Bearer ")[1]): undefined
            }
        }
    }))


    return app;
} 