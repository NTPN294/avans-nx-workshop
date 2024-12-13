import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    UseGuards
} from '@nestjs/common';
import { PostService } from './post.service';
import { IPost } from '@avans-nx-workshop/shared/api';
import { CreatePostDto, UpdatePostDto } from '@avans-nx-workshop/backend/dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    async findAll(): Promise<IPost[]> {
        return this.postService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IPost | null> {
        return this.postService.findOne(id);
    }

    @Post('')
    create(@Body() post: CreatePostDto): Promise<IPost> {
        return this.postService.create(post);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() post: UpdatePostDto
    ): Promise<IPost | null> {
        return this.postService.update(id, post);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        console.log(`Deleting post with id: ${id}`);
        await this.postService.delete(id);
        console.log(`Post with id: ${id} deleted`);
    }

    @Put(':id/:userId')
    async likePost(
        @Param('id') id: string,
        @Param('userId') userId: string
    ): Promise<void> {
        await this.postService.likePost(id, userId);
    }

    @Put(':id/comment/:comment/:rating/:userId')
    async commentPost(
        @Param('id') postId: string,
        @Param('comment') comment: string,
        @Param('rating') rating: number,
        @Param('userId') userId: string
    ): Promise<void> {
        await this.postService.commentPost(postId, comment, rating, userId);
    }

}