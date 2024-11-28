
export interface IPost {
    _id: string;
    title: string;
    description: string;
    date: Date;
    likes: number;
}

export type ICreatePost = Pick<IPost, 'title' | 'description' | 'date' | 'likes'>;
export type IUpdatePost = Partial<Omit<IPost, 'id'>>;
export type IUpsertPost = IPost;