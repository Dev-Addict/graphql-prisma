import protect from "../utils/auth/protect";

export default {
    posts: {
        fragment: 'fragment userId on User {id}',
        resolve(parent, args, {prisma: {query}, request}, info) {
            return query.posts({
                where: {
                    published: true,
                    author: {
                        id: parent.id
                    }
                }
            })
        }
    },
    email: {
        fragment: 'fragment userId on User {id}',
        resolve(parent, args, {prisma: {query}, request}, info) {
            const user = protect(request, query, false);

            if (user && parent.id === user.id) return parent.email;
            return null;
        }
    }
};
