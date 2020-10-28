import {GraphQLServer} from "graphql-yoga";

import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";
import prisma from "./prisma";

const resolvers = {
    Query,
    Mutation,
    Subscription,
    Post,
    User,
    Comment
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context(request) {
        return {
            prisma,
            request
        };
    }
});

server.start(() => {
    console.log('server is up.')
}).catch(error => {
    console.error(error);
});
