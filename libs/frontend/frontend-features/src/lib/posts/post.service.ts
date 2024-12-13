import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    IPost,
    ApiResponse,
    Comment,
    Model,
    Genre
} from '@avans-nx-workshop/shared/api';
import { map, tap, Observable, of } from 'rxjs';
import { environment} from '@avans-nx-workshop/shared/util-env';

@Injectable({ providedIn: 'root' })
export class PostService {



    constructor(private http: HttpClient) {
        console.log('PostrService created');
    }

    public getPostsAsync(): Observable<IPost[]> {
        console.log('getPostsAsync() aangeroepen');
        return this.http
        .get<ApiResponse<any>>(environment.dataApiUrl + '/post')
        .pipe(
            tap((response) => console.log(response)),
            map((response) => response.results),
            tap((response) => console.log(response))
        );
    }
    
    getPostByIdAsync(id: string | null): Observable<IPost | null> {
        console.log('getPostByIdAsync() called with id:', id);
    
        if (!id) {
            console.error('Invalid ID provided');
            return of(null);
        }
    
        return this.http
            .get<ApiResponse<IPost>>(`${environment.dataApiUrl}/post/${id}`)
            .pipe(
                tap((response) => console.log('Response from API:', response)),
                map((response) => {
                    const post = response.results;
                    if (Array.isArray(post) || post === undefined) {
                        return null;
                    }
                    return post;
                }), 
                tap((post) => console.log('Mapped post:', post)),
            );
    }
    

    savePostAsync(post: IPost): Observable<IPost> {
        let newpost = {
            ownerId: post.ownerId,
            title: post.title,
            description: post.description,
            date: post.date,
            likes: post.likes,
            comments: post.comments,
            models: post.models
        };

        console.log(newpost);
        console.log('Sending request to:', `${environment.dataApiUrl}/post`); 

        return this.http
            .post<ApiResponse<IPost>>(`${environment.dataApiUrl}/post`, newpost)
            .pipe(
                tap((response) => console.log('Response from save post:', response)),
                map((response) => {
                    const savedPost = response.results;
                    if (!savedPost || Array.isArray(savedPost)) {
                        throw new Error('Failed to save post. Invalid response.');
                    }
                    return savedPost;
                }),
                tap((savedPost) => console.log('Saved post:', savedPost)),
            );
    }
    
    deletePostAsync(id: string): Observable<void> {
        console.log('deletePostAsync() called with id:', id);
    
        if (!id) {
            console.error('Invalid ID provided for deletion');
            return of(); 
        }
    
        return this.http
            .delete<void>(`${environment.dataApiUrl}/post/${id}`)
            .pipe(
                tap(() => console.log(`Post with ID ${id} deleted successfully`)),
                tap(() => console.log('DELETE request sent to:', `${environment.dataApiUrl}/post/${id}`))
            );
    }
    
    updatePostAsync(id: string, post: Partial<IPost>): Observable<IPost> {
        console.log('updatePostAsync() called with id:', id);
        console.log('Updated post data:', post);
    
        if (!id) {
            console.error('Invalid ID provided for update');
            throw new Error('Post ID is required to update post');
        }

        let newPost={
            "title": post.title, 
            "ownerId": post.ownerId,
            "description": post.description,
            "likes": post.likes,
            "comments": post.comments,
            "models": post.models,
        }
    
        return this.http
            .put<ApiResponse<IPost>>(`${environment.dataApiUrl}/post/${id}`, newPost)
            .pipe(
                tap((response) => console.log('Response from update post:', response)),
                map((response) => {
                    const updatedPost = response.results;
                    if (!updatedPost || Array.isArray(updatedPost)) {
                        throw new Error('Failed to update post. Invalid response.');
                    }
                    return updatedPost;
                }),
                tap((updatedPost) => console.log('Updated post:', updatedPost)),
            );
    }
    
    saveFilesAsync(postId: string, files: File[]): Observable<string[]> {
        console.log('saveFilesAsync() called with files:', files);

        if (!postId || !files.length) {
            console.error('Invalid post ID or files provided for upload');
            return of([]); // Return empty observable or appropriate fallback
        }

        const formData = new FormData();

        files.forEach((file, index) => {
            formData.append(`files[${index}]`, file, file.name);
        });

        console.log('Sending files to:', `${environment.dataApiUrl}/upload/${postId}`);
        
        return this.http.post<ApiResponse<{ path: string }[]>>(`${environment.dataApiUrl}/upload/${postId}`, formData)
            .pipe(
                tap((response) => console.log('Files uploaded successfully:', response)),
                map((response) => {
                    if (!response.results) {
                        throw new Error('Failed to upload files. Invalid response.');
                    }
                    return response.results.map(fileInfo => fileInfo + "");
                }),
                tap((filePaths) => console.log('Saved file paths:', filePaths))
            );
    }


    likePostAsync(postId: string, userId:string): Observable<void> {
        const url = `${environment.dataApiUrl}/post/${postId}/${userId}`;

        return this.http
            .put<void>(url, {})
            .pipe(
                tap(() => console.log(`Post with ID ${postId} liked by user ${userId} successfully`)),
                tap(() => console.log('POST request sent to:', url))
            );
    }

    commentPostAsync(postId: string, comment: String, rating: number, userId:String): Observable<IPost> {
        const url = `${environment.dataApiUrl}/post/${postId}/comment/${comment}/${rating}/${userId}`;

        return this.http
            .put<IPost>(url, comment)
            .pipe(
                tap((response) => console.log('Response from update post:', response)),
                map((response) => {
                    return response;
                }),
                tap((updatedPost) => console.log('Updated post:', updatedPost)),
            );
    }
}
