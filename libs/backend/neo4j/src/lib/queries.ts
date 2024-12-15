import { IUser } from '@avans-nx-workshop/shared/api';

export const queries = {
    getAllUsers: 'MATCH (n:User) RETURN n',

    createUser(user: IUser){
        
    const following = JSON.stringify(user.following || []);
    const likedPosts = JSON.stringify(user.likedPosts || []);
    
        return `CREATE (u:User {
        name: '${user.name}',
        password: '${user.password}',
        emailAddress: '${user.emailAddress}',
        profileImgUrl: '${user.profileImgUrl}',
        role: '${user.role}',
        gender: '${user.gender}',
        following: '${following}',
        likedPosts: '${likedPosts}',
        mongoDbId: '${user.mongoDbId}'
        }) RETURN u;`
    },

    updateUser(user: IUser) {
        const following = JSON.stringify(user.following || []);
        const likedPosts = JSON.stringify(user.likedPosts || []);

        return `
        MATCH (u:User { mongoDbId: '${user.mongoDbId}' })
        SET u.name = '${user.name}',
            u.password = '${user.password}',
            u.emailAddress = '${user.emailAddress}',
            u.profileImgUrl = '${user.profileImgUrl}',
            u.role = '${user.role}',
            u.gender = '${user.gender}',
            u.following = '${following}',
            u.likedPosts = '${likedPosts}'
        RETURN u;
        `;
    },

    deleteUser(mongoDbId: string) {
        return `
        MATCH (u:User { mongoDbId: '${mongoDbId}' })
        DETACH DELETE u
        RETURN 'User with mongoDbId ${mongoDbId} has been deleted';
        `;
    },

    follow(id: string, followId: string) {
        return `
        MATCH (u:User { mongoDbId: '${id}' })
        MATCH (f:User { mongoDbId: '${followId}' })
        MERGE (u)-[:FOLLOWS]->(f)
        RETURN u, f;
        `;
    },

    unfollow(id: string, followId: string) {
        return `
        MATCH (u:User { mongoDbId: '${id}' })-[r:FOLLOWS]->(f:User { mongoDbId: '${followId}' })
        DELETE r
        RETURN u, f;
        `;
    }
};