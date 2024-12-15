import { HttpClient } from '@angular/common/http';
import { Injectable, viewChildren } from '@angular/core';
import {
    IPost,
    ApiResponse,
    Comment,
    Model,
    Genre
} from '@avans-nx-workshop/shared/api';
import { map, tap, Observable, of, switchMap, forkJoin } from 'rxjs';
import { environment } from '@avans-nx-workshop/shared/util-env';

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


    savePostAsync(post: IPost): Observable<
        {
            savedPost: IPost | undefined;
            savedPostNeo4J: IPost | undefined;
        }> {
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
        console.log('Sending request to:', `${environment.dataApiUrl}/posts`);

        return this.http.post<ApiResponse<IPost>>(`${environment.dataApiUrl}/post`, newpost).pipe(
            map((response) => {
                const savedPost = response.results;
                if (!savedPost || Array.isArray(savedPost)) {
                    throw new Error('Failed to save post. Invalid response.');
                }
                console.log('Saved post in mongoDb:', savedPost);
                return savedPost;
            }),
            switchMap((savedPost) => {
                const neo4jPost = {
                    ...newpost,
                    mongoDbId: savedPost._id,
                };

                neo4jPost.title = escapeString(neo4jPost.title);
                neo4jPost.description = escapeString(neo4jPost.description);
                neo4jPost.models.forEach((model) => {
                    model.title = escapeString(model.title);
                    model.description = escapeString(model.description);
                });

                console.log("payload for Neo4J", neo4jPost);

                return this.http.post<ApiResponse<IPost>>(`${environment.NEO4J_dataApiUrl}/posts`, neo4jPost).pipe(
                    map((response) => {
                        const savedPostNeo4J = Array.isArray(response.results) ? response.results[0] : response.results;
                        return {
                            savedPost,
                            savedPostNeo4J
                        };
                    })
                );
            }),
            tap((finalResult) => console.log('Final result:', {
                savedPost: finalResult.savedPost,
                savedPostNeo4J: finalResult.savedPostNeo4J
            }))
        );
    }

    deletePostAsync(id: string): Observable<null> {
        console.log('deletePostAsync() called with id:', id);

        if (!id) {
            console.error('Invalid ID provided for deletion');
            return of();
        }

        // Delete from MongoDB
        const deleteMongoDbPost = this.http.delete<void>(`${environment.dataApiUrl}/post/${id}`).pipe(
            tap(() => console.log(`Post with ID ${id} deleted successfully from MongoDB`)),
            tap(() => console.log('DELETE request sent to MongoDB:', `${environment.dataApiUrl}/post/${id}`))
        );

        // Delete from Neo4j
        const deleteNeo4jPost = this.http.delete<void>(`${environment.NEO4J_dataApiUrl}/posts/${id}`).pipe(
            tap(() => console.log(`Post with ID ${id} deleted successfully from Neo4j`)),
            tap(() => console.log('DELETE request sent to Neo4j:', `${environment.NEO4J_dataApiUrl}/posts/${id}`))
        );

        return forkJoin([deleteMongoDbPost, deleteNeo4jPost]).pipe(
            tap(() => console.log('Both delete operations completed successfully')),
            map(() => null)
        );
    }


    updatePostAsync(id: string, post: Partial<IPost>): Observable<IPost> {
        console.log('updatePostAsync() called with id:', id);
        console.log('Updated post data:', post);

        if (!id) {
            console.error('Invalid ID provided for update');
            throw new Error('Post ID is required to update post');
        }

        let newPost = post;

        console.log("mongoDB payload", newPost);
        const updateMongoDbPost = this.http.put
            <ApiResponse<IPost>>(`${environment.dataApiUrl}/post/${id}`, newPost).pipe(
                map((response) => {
                    const updatedPost = response.results;
                    if (!updatedPost || Array.isArray(updatedPost)) {
                        throw new Error('Failed to update post. Invalid response.');
                    }
                    console.log('Updated post in mongoDb:', updatedPost);
                    return updatedPost;
                }),
                tap((updatedPost) => console.log('Updated post:', updatedPost))
            );

        let neo4jPost = JSON.parse(JSON.stringify(post)); 
        neo4jPost.title = escapeString(neo4jPost.title as string);
        neo4jPost.description = escapeString(neo4jPost.description as string);
        neo4jPost.models?.forEach((model: any) => {
            model.title = escapeString(model.title);
            model.description = escapeString(model.description);
        });
        const updateNeo4jPost = this.http.put
            <ApiResponse<IPost>>(`${environment.NEO4J_dataApiUrl}/posts/${id}`, neo4jPost).pipe(
                map((response) => {
                    const updatedPost = response.results;
                    if (!updatedPost || Array.isArray(updatedPost)) {
                        throw new Error('Failed to update post. Invalid response.');
                    }
                    console.log('Updated post in Neo4j:', updatedPost);
                    return updatedPost;
                }),
                tap((updatedPost) => console.log('Updated post:', updatedPost))
            );

        return forkJoin([updateMongoDbPost, updateNeo4jPost]).pipe(
            map(([mongoUpdate, neo4jUpdate]) => {
                return {
                    ...mongoUpdate,
                    ...neo4jUpdate,
                };
            }),
            tap((finalUpdate) => console.log('Combined update result:', finalUpdate))
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


    likePostAsync(postId: string, userId: string): Observable<null> {
        const url = `${environment.dataApiUrl}/post/${postId}/${userId}`;

        // PUT request to like the post in MongoDB
        const likeMongoDbPost = this.http
            .put<void>(url, {})
            .pipe(
                tap(() => console.log(`Post with ID ${postId} liked by user ${userId} successfully in MongoDB`)),
                tap(() => console.log('POST request sent to MongoDB:', url))
            );

        // PUT request to like the post in Neo4j
        const likeNeo4jPost = this.http
            .put<void>(`${environment.NEO4J_dataApiUrl}/posts/${postId}/${userId}`, {})
            .pipe(
                tap(() => console.log(`Post with ID ${postId} liked by user ${userId} successfully in Neo4j`)),
                tap(() => console.log('POST request sent to Neo4j:', `${environment.NEO4J_dataApiUrl}/posts/${postId}/like/${userId}`))
            );

        // Combine both requests
        return forkJoin([likeMongoDbPost, likeNeo4jPost]).pipe(
            tap(() => console.log('Both like operations completed successfully')),
            map(() => null)  // Complete the observable without emitting further values
        );
    }


    commentPostAsync(postId: string, comment: String, rating: number, userId: String): Observable<IPost> {
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

    getRecommendedPostsAsync(userId: string): Observable<IPost[]> {
        console.log('getRecommendedPostsAsync() called with userId:', userId);

        if (!userId) {
            console.error('Invalid user ID provided');
            return of([]); // Return an empty array if no valid user ID is provided
        }

        return this.http
            .get<ApiResponse<IPost[]>>(`${environment.NEO4J_dataApiUrl}/posts/rcmnd/${userId}`)
            .pipe(
                tap((response) => console.log('Response from Neo4j API:', response)),
                map((response) => {
                    const recommendedPosts = response?.results || [];
                    if (!Array.isArray(recommendedPosts)) {
                        throw new Error('Unexpected response structure from API');
                    }
                    return recommendedPosts.flat();
                }),
                tap((posts) => console.log('Recommended post IDs:', posts))
            );
    }

}

function escapeString(value: string): string {
    return value.replace(/'/g, "\\'");
}
