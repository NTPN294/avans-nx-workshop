import { IUser } from '@avans-nx-workshop/shared/api';
import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import {queries} from './queries';

@Injectable()
export class Neo4JPostService {
    private readonly logger: Logger = new Logger(Neo4JPostService.name);

    constructor(private readonly neo4jService: Neo4jService) {}

    async findAll(): Promise<any> {
        this.logger.log('findAll posts');
        const results = await this.neo4jService.read(
            queries.getAllPosts
        );
        return results.records.map((record) => record.get(0).properties);
    }

    async createPost(post: any): Promise<any> {
        this.logger.log('create post');
        const result = await this.neo4jService.write(
            queries.createPost(post)
        );
        return result.records[0].get(0).properties;
    }

    async updatePost(id: string, post: any): Promise<any> {
        this.logger.log('update post');
        const result = await this.neo4jService.write(
            queries.updatePost(id, post)
        );
        return result.records[0].get(0).properties;
    }

    async deletePost(id: string): Promise<any> {
        this.logger.log('delete post');
        const result = await this.neo4jService.write(
            queries.deletePost(id)
        );
        return result.records[0].get(0);
    }

    async likePost(postId: string, userId: string): Promise<any> {
        this.logger.log(userId + ' liked post: ' + postId);
        const result = await this.neo4jService.write(
            queries.likePost(postId, userId)
        );
        return result.records[0].get(0).properties;
    }

    async getRecommendations(userId: string): Promise<any> {
        this.logger.log('get recommendations for user: ' + userId);
        const result = await this.neo4jService.read(
            queries.getRecommendations(userId)
        );
        return result.records.map((record) => record.get(0).properties);
    }

}