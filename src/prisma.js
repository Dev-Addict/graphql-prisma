import {Prisma} from "prisma-binding";

const prisma = new Prisma({
    typeDefs: 'src/generated/schema.graphql',
    endpoint: 'http://127.0.0.1:4466'
});
