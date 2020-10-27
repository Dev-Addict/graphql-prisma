export default {
    async createUser(parentValue, {data: {name, email}}, {prisma: {mutation, exists}}, info) {
        return mutation.createUser({data: {name, email}}, info);
    },
    async deleteUser(parentValues, {id}, {prisma: {mutation, exists}}, info) {
        return mutation.deleteUser({where: {id}}, info);
    },
    async updateUser(parentValues, {id, data}, {prisma: {mutation, exists}}, info) {
        return mutation.updateUser({where: {id}, data}, info);
    },
    async createPost(parentValues, {data: {title, body, published, author}}, {prisma: {mutation, exists}}, info) {
        return mutation.createPost({data: {title, body, published, author: {connect: {id: author}}}}, info);
    },
    deletePost(parentValues, {id}, {prisma: {mutation}}, info) {
        return mutation.deletePost({where: {id}}, info);
    },
    updatePost(parentValues, {id, data}, {prisma: {mutation}}, info) {
        return mutation.updatePost({where: {id}, data}, info);
    },
    createComment(parentValues, {data}, {prisma: {mutation}}, info) {
        return mutation.createComment({data}, info);
    },
    deleteComment(parentValues, {id}, {prisma: {mutation}}, info) {
        return mutation.deleteComment({where: {id}}, info);
    },
    updateComment(parentValues, {id, data}, {prisma: {mutation}}, info) {
        return mutation.updateComment({where: {id}, data}, info);
    }
};
