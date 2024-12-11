
export interface Comment{
    _id: string;
    comment: string;
    rating: number;
    date: Date;
}

export enum Genre {
    Art,
    Fashion,
    Furniture,
    Gadgets,
    Jewelry,
    Tools,
}



export interface Model{
    _id: string;
    title: string;
    description: string;
    files: string[];
    images: string[];
    genres: Genre[];
}
export interface IPost {
    _id: string;
    ownerId: string;
    title: string;
    description: string;
    date: Date;
    likes: number;
    comments: Comment[];
    models: Model[];  
}

export type ICreatePost = Pick<IPost, 'title' | 'description' | 'date' | 'likes'>;
export type IUpdatePost = Partial<Omit<IPost, 'id'>>;
export type IUpsertPost = IPost;