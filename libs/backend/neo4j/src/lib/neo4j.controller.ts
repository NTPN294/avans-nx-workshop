import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Neo4JUserService } from './neo4j-users.service';
import {IUser} from '@avans-nx-workshop/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';

@Controller('users')
export class Neo4JExampleController {
    constructor(private readonly neo4jService: Neo4JUserService) {}

    @Get('')
    async getAllUsers(): Promise<any> {
        const results = await this.neo4jService.findAll();
        return results;
    }

    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<any> {
        const results = await this.neo4jService.createUser(user);
        return results;
    }

    @Put(':id')
    async updateUser(@Body() user: UpdateUserDto): Promise<any> {
        const results = await this.neo4jService.updateUser(user);
        return user;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<any> {
        const results = await this.neo4jService.deleteUser(id);
        return results;
    }

    @Put(':id/follow/:followId')
    async follow(@Param('id') id: string, @Param('followId') followId: string): Promise<any> {
        const results = await this.neo4jService.follow(id, followId);
        return results;
    }

    @Put(':id/unfollow/:followId')
    async unfollow(@Param('id') id: string, @Param('followId') followId: string): Promise<any> {
        const results = await this.neo4jService.unfollow(id, followId);
        return results;
    }
}
