import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    UseGuards,
    Logger
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUserInfo, IUser } from '@avans-nx-workshop/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';
import { UserExistGuard } from './user-exists.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(): Promise<IUserInfo[]> {
        return this.userService.findAll();
    }

    // this method should precede the general getOne method, otherwise it never matches
    // @Get('self')
    // async getSelf(@InjectToken() token: Token): Promise<IUser> {
    //     const result = await this.userService.getOne(token.id);
    //     return result;
    // }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IUser | null> {
        return this.userService.findOne(id);
    }

    @Post('')
    @UseGuards(UserExistGuard)
    create(@Body() user: CreateUserDto): Promise<IUserInfo> {
        return this.userService.create(user);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() user: UpdateUserDto
    ): Promise<IUserInfo | null> {
        return this.userService.update(id, user);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        console.log(`Deleting user with id: ${id}`);
        await this.userService.delete(id);
        console.log(`User with id: ${id} deleted`);
    }

    @Put(':id/follow/:followId')
    async follow(
        @Param('id') id: string,
        @Param('followId') followId: string
    ): Promise<void> {
        await this.userService.follow(id, followId);
    }

    @Put(':id/unfollow/:followId')
    async unfollow(
        @Param('id') id: string,
        @Param('followId') followId: string
    ): Promise<void> {
        await this.userService.unfollow(id, followId);
    }
}
