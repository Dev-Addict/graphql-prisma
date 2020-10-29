import protect from "../utils/auth/protect";

export default {
    email(parent, args, {prisma: {query}, request}, info) {
        const user = protect(request, query, false);

        if (user && parent.id === user.id) return parent.email;
        return null;
    }
};
