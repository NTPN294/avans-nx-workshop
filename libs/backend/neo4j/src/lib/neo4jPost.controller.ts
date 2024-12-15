import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Neo4JPostService } from './neo4j-posts.service';
import {IUser} from '@avans-nx-workshop/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';

@Controller('posts')
export class Neo4JPostController {
    constructor(private readonly neo4jPostService: Neo4JPostService) {}

    @Get()
    async getAllUsers(): Promise<any> {
        const results = await this.neo4jPostService.findAll();
        return results;
    }

    @Post()
    async createPost(@Body() post: any): Promise<any> {
        const results = await this.neo4jPostService.createPost(post);
        return post;
    }

    @Put(":id")
    async updatePost(@Param('id') id: string, @Body() post: any): Promise<any> {
        const results = await this.neo4jPostService.updatePost(id, post);
        return results;
    }

    @Delete(":id")
    async deletePost(@Param('id') id: string): Promise<any> {
        const results = await this.neo4jPostService.deletePost(id);
        return results;
    }

    @Put(":postId/:userId")
    async likePost(@Param('postId') postId: string, @Param('userId') userId: string): Promise<any> {
        const results = await this.neo4jPostService.likePost(postId, userId);
        return results;
    }

    @Get("rcmnd/:userId")
    async getRecommendations(@Param('userId') userId: string): Promise<any> {
        return await this.neo4jPostService.getRecommendations(userId);
    }

}