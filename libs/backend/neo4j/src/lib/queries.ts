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
    },


    getAllPosts: 'MATCH (n:Post) RETURN n',
    createPost(post: any){
        const comments = JSON.stringify(post.comments || []);
    const models = JSON.stringify(post.models || []);

        return `
        CREATE (p:Post {
            title: '${post.title}',
            ownerId: '${post.ownerId}', 
            description: '${post.description}',
            date: '${post.date}',
            likes: '${post.likes}',
            comments: '${comments}',
            models: '${models}',
            mongoDbId: '${post.mongoDbId}'
        }) 
        WITH p
        MATCH (u:User { mongoDbId: '${post.ownerId}' })
        CREATE (u)-[:CREATED]->(p)
        RETURN p;
    `;
    },

    updatePost(id: string, post: any) {
        const comments = JSON.stringify(post.comments || []);
        const models = JSON.stringify(post.models || []);

        return `
        MATCH (p:Post { mongoDbId: '${id}' })
        SET p.title = '${post.title}',
            p.ownerId = '${post.ownerId}',
            p.description = '${post.description}',
            p.date = '${post.date}',
            p.likes = '${post.likes}',
            p.comments = '${comments}',
            p.models = '${models}'
        RETURN p;
        `;
    },

    deletePost(id: string) {
        return `
        MATCH (p:Post { mongoDbId: '${id}' })
        DETACH DELETE p
        RETURN 'Post with mongoDbId ${id} has been deleted';
        `;
    },

    likePost(postId: string, userId: string) {
        return `
        MATCH (p:Post { mongoDbId: '${postId}' })
        MATCH (u:User { mongoDbId: '${userId}' })
        MERGE (u)-[:LIKES]->(p)
        RETURN p;
        `;
    },

    getRecommendations(userId: string) {
        return `
         MATCH (u:User { mongoDbId: '${userId}' })-[:LIKES]->(p:Post)
        MATCH (otherUsers:User)-[:LIKES]->(p)
        WHERE otherUsers.mongoDbId <> '${userId}'          
MATCH (otherPosts:Post)<-[:LIKES]-(otherUsers)
        RETURN otherPosts
        `;
    }
};