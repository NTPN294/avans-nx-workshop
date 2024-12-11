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
    
        return this.http
            .put<ApiResponse<IPost>>(`${environment.dataApiUrl}/post/${id}`, post)
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
    

}
