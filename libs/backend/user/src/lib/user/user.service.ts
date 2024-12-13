import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user.schema';
import { IUser, IUserInfo } from '@avans-nx-workshop/shared/api';
// import { Meal, MealDocument } from '@avans-nx-workshop/backend/features';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name);

    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument> // @InjectModel(Meal.name) private meetupModel: Model<MealDocument>
    ) {}

    async findAll(): Promise<IUserInfo[]> {
        this.logger.log(`Finding all items`);
        const items = await this.userModel.find();
        return items;
    }

    async findOne(_id: string): Promise<IUser | null> {
        this.logger.log(`finding user with id ${_id}`);
        const item = await this.userModel.findOne({ _id }).exec();
        if (!item) {
            this.logger.debug('Item not found');
        }
        return item;
    }

    async findOneByEmail(email: string): Promise<IUserInfo | null> {
        this.logger.log(`Finding user by email ${email}`);
        const item = this.userModel
            .findOne({ emailAddress: email })
            .select('-password')
            .exec();
        return item;
    }

    async create(user: CreateUserDto): Promise<IUserInfo> {
        this.logger.log(`Create user ${user.name}`);
        const createdItem = this.userModel.create(user);
        return createdItem;
    }

    async update(_id: string, user: UpdateUserDto): Promise<IUserInfo | null> {
        this.logger.log(`Update user ${user.name}`);
        return this.userModel.findByIdAndUpdate({ _id }, user);
    }

    async delete(_id: string): Promise<void> {
        this.logger.log(`Delete user with id ${_id}`);
        await this.userModel.findByIdAndDelete({ _id });
    }

    async follow(userId: string, followId: string): Promise<void> {
        this.logger.log(`User ${userId} is following ${followId}`);
        const follow = await this.userModel.findById(followId);
        if (!follow) {
            throw new HttpException('User not found', 404);
        }
        follow.following.push(userId);
        await follow.save();
    }

    async unfollow(userId: string, followId: string): Promise<void> {
        this.logger.log(`User ${userId} is unfollowing ${followId}`);
        const follow = await this.userModel.findById(followId);
        if (!follow) {
            throw new HttpException('User not found', 404);
        }
        follow.following = follow.following.filter((id) => id !== userId);
        await follow.save();
    }
}
