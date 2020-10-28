import {hash, compare} from 'bcrypt';
import {sign} from 'jsonwebtoken';

import protect from "../utils/auth/protect";

export default {
    async createUser(parentValue, {data: {name, email, password}}, {prisma: {mutation, exists}}, info) {
        if (password.length < 8) throw new Error('Invalid Password');

        password = await hash(password, 12);

        const user = await mutation.createUser({data: {name, email, password}});

        const token = sign({id: user.id}, 'someRandomSecret');

        return {
            user,
            token
        };
    },
    async signIn(parentValues, {data: {email, password}}, {prisma: {mutation, query}}, info) {
        const user = await query.user({where: {email: email}});

        if (!user) throw new Error("Invalid email or password");

        const isMatched = await compare(password, user.password);

        if (!isMatched) throw new Error("Invalid email or password");

        const token = sign({id: user.id}, 'someRandomSecret');

        return {
            user,
            token
        };
    },
    async deleteUser(parentValues, {id}, {prisma: {mutation, exists}}, info) {
        return mutation.deleteUser({where: {id}}, info);
    },
    async updateUser(parentValues, {id, data}, {prisma: {mutation, exists}}, info) {
        return mutation.updateUser({where: {id}, data}, info);
    },
    async createPost(parentValues, {data: {title, body, published}}, {prisma: {mutation, query}, request}, info) {
        const {id} = await protect(request, query);

        return mutation.createPost({data: {title, body, published, author: {connect: {id}}}}, info);
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
