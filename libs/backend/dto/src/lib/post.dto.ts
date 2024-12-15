import { IsNotEmpty, IsString, IsOptional, IsDate, IsNumber, ValidateNested, IsArray, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import {
    IUpdatePost,
    IUpsertPost,
    Id,
    Comment,
    Model,
    Genre
} from '@avans-nx-workshop/shared/api';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;
}

export class CommentDto {
    @IsString()
    @IsNotEmpty()
    comment!: string;

    rating!: number;

    date!: Date;

    @IsString()
    userId!: string;

    @IsString()
    userName!: string;
}

export class ModelDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsArray()
    @IsNotEmpty()
    files!: string[];

    @IsArray()
    @IsNotEmpty()
    images!: string[];

    @IsArray()
    @IsNotEmpty()
    genres!: Genre[];
}

export class UpsertPostDto implements IUpsertPost {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    ownerId!: string;

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

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CommentDto)
    comments!: CommentDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ModelDto)
    models!: ModelDto[];
}

export class UpdatePostDto implements IUpdatePost {
    @IsString()
    @IsOptional()
    _id?: string;

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    date?: Date;

    @IsNumber()
    @IsOptional()
    likes?: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CommentDto)
    @IsOptional()
    comments?: CommentDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ModelDto)
    @IsOptional()
    models?: ModelDto[];
}
