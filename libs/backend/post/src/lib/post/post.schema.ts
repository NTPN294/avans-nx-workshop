import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
// import { v4 as uuid } from 'uuid';
import {
    IPost,
    Comment,
    Model
} from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type PostDocument = Post & Document;

@Schema()
export class Post implements IPost {
    @IsMongoId()
    _id!: string;

    @Prop({
        required: true,
        type: String
    })
    title!: string;

    @Prop({
        required: true,
        type: String
    })
    ownerId!: string;
   
    @Prop({
        required: true,
        type: String
    })
    description!: string;

    @Prop({
        required: false,
        type: Date,
        default: () => new Date()
    })
    date!: Date;

    @Prop({
        required: false,
        type: Number,
        default: 0
    })
    likes!: number;

    @Prop({
        required: false,
        type: Array
    })
    comments!: Comment[];

    @Prop({
        required: false,
        type: Array
    })
    models!: Model[];


}

export const PostSchema = SchemaFactory.createForClass(Post);
