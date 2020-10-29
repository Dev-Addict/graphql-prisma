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
    async signIn(parentValues, {data: {email, password}}, {prisma: {query}}) {
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
    async deleteUser(parentValues, args, {prisma: {mutation, query}, request}, info) {
        const {id} = await protect(request, query);

        return mutation.deleteUser({where: {id}}, info);
    },
    async updateUser(parentValues, {data}, {prisma: {mutation, query}, request}, info) {
        const {id} = await protect(request, query);

        return mutation.updateUser({where: {id}, data}, info);
    },
    async createPost(parentValues, {data: {title, body, published}}, {prisma: {mutation, query}, request}, info) {
        const {id} = await protect(request, query);

        return mutation.createPost({data: {title, body, published, author: {connect: {id}}}}, info);
    },
    async deletePost(parentValues, {id}, {prisma: {mutation, query, exists}, request}, info) {
        const {id: userId} = await protect(request, query);
        const isUsers = exists.Post({id, author: {id: userId}});

        if (!isUsers) throw new Error('this is not your post.');

        return mutation.deletePost({where: {id}}, info);
    },
    async updatePost(parentValues, {id, data}, {prisma: {mutation, query, exists}, request}, info) {
        const {id: userId} = await protect(request, query);
        const isUsers = exists.Post({id, author: {id: userId}});

        if (!isUsers) throw new Error('this is not your post.');

        return mutation.updatePost({where: {id}, data}, info);
    },
    async createComment(parentValues, {data: {text, post}}, {prisma: {mutation, query}, request}, info) {
        const {id} = await protect(request, query);

        return mutation.createComment({text, post, author: id}, info);
    },
    async deleteComment(parentValues, {id}, {prisma: {mutation, query, exists}, request}, info) {
        const {id: userId} = await protect(request, query);
        const isUsers = exists.Comment({id, author: {id: userId}});

        if (!isUsers) throw new Error('this is not your comment.');

        return mutation.deleteComment({where: {id}}, info);
    },
    async updateComment(parentValues, {id, data}, {prisma: {mutation, query, exists}, request}, info) {
        const {id: userId} = await protect(request, query);
        const isUsers = exists.Comment({id, author: {id: userId}});

        if (!isUsers) throw new Error('this is not your comment.');

        return mutation.updateComment({where: {id}, data}, info);
    }
};
