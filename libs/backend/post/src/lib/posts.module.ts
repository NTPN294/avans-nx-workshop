import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post/post.schema';
import {User, UserSchema} from '@avans-nx-workshop/backend/user';

// import { Meal, MealSchema } from '@avans-nx-workshop/backend/features';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Post.name, schema: PostSchema }, {name: User.name, schema: UserSchema}
            // { name: Meal.name, schema: MealSchema },
        ])
    ],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService]
})
export class PostsModule {}
