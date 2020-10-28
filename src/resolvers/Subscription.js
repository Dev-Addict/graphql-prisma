export default {
    comment: {
        subscribe(parentValues, {postId}, {prisma: {subscription}}, info) {
            return subscription.comment({where: {node: {post: {id: postId}}}}, info);
        }
    },
    post: {
        subscribe(parentValues, args, {prisma: {subscription}}, info) {
            return subscription.post({where: {node: {published: true}}}, info);
        }
    }
};
