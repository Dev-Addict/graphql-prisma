import protect from "../utils/auth/protect";

export default {
    users(parentValues, {query}, {prisma}, info) {
        const operationArgs = {};

        if (query)
            operationArgs.where = {
                OR: [
                    {
                        name_contains: query
                    },
                    {
                        email_contains: query
                    }
                ]
            };

        return prisma.query.users(operationArgs, info);
    },
    posts(parentValues, {query}, {prisma, request}, info) {
        const user = protect(request, prisma.query, false);
        const operationArgs = {};

        if (query)
            operationArgs.where.OR = [
                {
                    title_contains: query,
                    OR: [
                        {
                            published: true
                        },
                        {
                            author: {
                                id: user.id
                            }
                        }
                    ]
                },
                {
                    body_contains: query,
                    OR: [
                        {
                            published: true
                        },
                        {
                            author: {
                                id: user.id
                            }
                        }
                    ]
                }
            ];
        else
            operationArgs.where = {
                OR: [
                    {
                        published: true
                    },
                    {
                        author: {
                            id: user.id
                        }
                    }
                ]
            };

        return prisma.query.posts(operationArgs, info);
    },
    comments(parentValues, {query}, {prisma}, info) {
        const operationArgs = {};

        if (query)
            operationArgs.where = {
                text_contains: query
            };

        return prisma.query.comments(operationArgs, info);
    },
    async post(parentValues, {id}, {prisma: {query}, request}, info) {
        const user = await protect(request, query, false);

        const posts = await query.posts({
            where: {
                id,
                OR: [
                    {
                        published: true
                    },
                    {
                        author: {
                            id: user ? user.id : undefined
                        }
                    }
                ]
            }
        }, info);

        if (!posts.length) throw new Error('post not found.');

        return posts[0];
    }
};
