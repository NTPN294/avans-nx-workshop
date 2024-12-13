import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post as PostModel, PostDocument } from './post.schema';
import {User as UserModel, UserDocument} from '@avans-nx-workshop/backend/user';
import { IPost} from '@avans-nx-workshop/shared/api';
// import { Meal, MealDocument } from '@avans-nx-workshop/backend/features';
import { CreatePostDto, UpdatePostDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class PostService {
    private readonly logger: Logger = new Logger(PostService.name);

    constructor(
        @InjectModel(PostModel.name) private postModel: Model<PostDocument>,
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    ) {}

    async findAll(): Promise<IPost[]> {
        this.logger.log(`Finding all items`);
        const items = await this.postModel.find();
        return items;
    }

    async findOne(_id: string): Promise<IPost | null> {
        this.logger.log(`finding post with id ${_id}`);
        const item = await this.postModel.findOne({ _id }).exec();
        if (!item) {
            this.logger.debug('Item not found');
        }
        return item;
    }

    async create(post: CreatePostDto): Promise<IPost> {
        this.logger.log(`Create post ${post.title}`);
        const createdItem = this.postModel.create(post);
        return createdItem;
    }

    async update(_id: string, post: UpdatePostDto): Promise<IPost | null> {
        this.logger.log(`Update post ${post.title}`);
        return this.postModel.findByIdAndUpdate({ _id }, post);
    }

    async delete(_id: string): Promise<void> {
        this.logger.log(`Delete post with id ${_id}`);
        await this.postModel.findByIdAndDelete({ _id });
    }

    async likePost(_id: string, userId: string): Promise<void> {
        this.logger.log(`Like post with id ${_id} by user ${userId}`);
    
        const post = await this.postModel.findById(_id).exec();
        if (!post) {
            this.logger.debug('Post not found');
            throw new HttpException('Post not found', 404);
        }
    
        post.likes += 1;
    
        await post.save();

        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            this.logger.debug('User not found');
            throw new HttpException('User not found', 404);
        }
        user.likedPosts.push(_id);
        await user.save();

    
        this.logger.log(`Post with id ${_id} liked by user ${userId}`);
    }
    
    async commentPost(_id: string, comment: string, rating: number, userId: string): Promise<IPost | null> {

        this.logger.log(`Comment post with id ${_id}`);
    
        const post = await this.postModel.findById(_id).exec();
        if (!post) {
            this.logger.debug('Post not found');
            throw new HttpException('Post not found', 404);
        }

        let newComment = {
            comment: comment,
            rating: rating,
            date: new Date(),
            userId: userId
        }
    
        post.comments.push(newComment);
    
        return this.postModel.findByIdAndUpdate({ _id }, post);
        }
}
