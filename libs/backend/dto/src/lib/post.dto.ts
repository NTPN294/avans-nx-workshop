import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsDate, IsNumber } from 'class-validator';
import {
    // ICreateUser,
    IUpdatePost,
    IUpsertPost,
    Id,
    UserGender,
    UserRole
} from '@avans-nx-workshop/shared/api';
import { Meal } from '@avans-nx-workshop/backend/features';

export class CreatePostDto{
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;
}

export class UpsertPostDto implements IUpsertPost {
    _id!: Id;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsDate()
    @IsNotEmpty()
    date!: Date;

    @IsNumber()
    @IsNotEmpty()
    likes!: number;
}

export class UpdatePostDto implements IUpdatePost {
    _id?: string | undefined;

    @IsString()
    @IsOptional()
    title!: string;
}
