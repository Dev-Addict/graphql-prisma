import {verify} from 'jsonwebtoken';

const protect = async ({request: {headers: {authorization: bearerToken}}}, query, required = true) => {
    if (!required && !bearerToken) return;
    if (!bearerToken) throw new Error('couldn\'t find token');
    if (!bearerToken.startsWith('Bearer ')) throw new Error('Invalid Token');
    const token = bearerToken.split(' ')[1];

    const {id} = verify(token, 'someRandomSecret');
    const user = await query.user({where: {id: id}});

    if (!user) throw new Error('provided id belong to a user that no longer exists');

    return user;
};

export default protect;
