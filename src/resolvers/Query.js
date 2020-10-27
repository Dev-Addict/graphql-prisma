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
    posts(parentValues, {query}, {prisma}, info) {
        const operationArgs = {};

        if (query)
            operationArgs.where = {
                OR: [
                    {
                        title_contains: query
                    },
                    {
                        body_contains: query
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
    }
};
