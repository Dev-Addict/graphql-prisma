import {Prisma} from "prisma-binding";

import {fragmentReplacements} from "./resolvers";

const prisma = new Prisma({
    typeDefs: 'src/generated/schema.graphql',
    endpoint: 'http://127.0.0.1:4466',
    secret: 'superSecretTask1234',
    fragmentReplacements
});

export default prisma;
