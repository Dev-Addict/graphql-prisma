export default {
    comments: {
        subscribe(parentValues, args, {pubsub}) {
            return pubsub.asyncIterator('COMMENTS');
        }
    }
};
