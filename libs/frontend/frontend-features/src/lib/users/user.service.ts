import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    Id,
    ApiResponse,
    IUserInfo,
    UserGender,
    UserRole
} from '@avans-nx-workshop/shared/api';
import { map, tap, Observable, of, forkJoin, switchMap } from 'rxjs';
import { environment} from '@avans-nx-workshop/shared/util-env';

@Injectable({ providedIn: 'root' })
export class UserService {



    constructor(private http: HttpClient) {
        console.log('UserService created');
    }

    public getUsersAsync(): Observable<IUserInfo[]> {
        console.log('getUserAsync() aangeroepen');
        return this.http
        .get<ApiResponse<any>>(environment.dataApiUrl + '/user')
        .pipe(
            tap((response) => console.log(response)),
            map((response) => response.results),
            tap((response) => console.log(response))
        );
    }
    
    getUserByIdAsync(id: string | null): Observable<IUserInfo | null> {
        console.log('getUserByIdAsync() called with id:', id);
    
        if (!id) {
            console.error('Invalid ID provided');
            return of(null);
        }
    
        return this.http
            .get<ApiResponse<IUserInfo>>(`${environment.dataApiUrl}/user/${id}`)
            .pipe(
                tap((response) => console.log('Response from API:', response)),
                map((response) => {
                    const user = response.results;
                    if (Array.isArray(user) || user === undefined) {
                        return null;
                    }
                    return user;
                }), // Ensure the result is a single user or null
                tap((user) => console.log('Mapped user:', user)),
            );
    }    

    saveUserAsync(user: IUserInfo): Observable<{
        savedUser: IUserInfo | undefined;
        savedUserNeo4j: IUserInfo | undefined;
    }> {
        const newUser = {
            name: user.name,
            emailAddress: user.emailAddress,
            password: user.password,
            gender: user.gender,
            role: user.role,
            isActive: user.isActive,
            profileImgUrl: user.profileImgUrl,
        };
    
        console.log('New User:', newUser);
        console.log('Sending request to:', `${environment.dataApiUrl}/user`);
        console.log('Sending request to:', `${environment.NEO4J_dataApiUrl}/users`);
    
        // First request to MongoDB
        return this.http.post<ApiResponse<IUserInfo>>(`${environment.dataApiUrl}/user`, newUser).pipe(
            map((response) => {
                const savedUser = response.results;
                if (!savedUser || Array.isArray(savedUser)) {
                    throw new Error('Failed to save user in MongoDB. Invalid response.');
                }
                console.log('Saved User in MongoDB:', savedUser);
                return savedUser; // Return the saved user from MongoDB
            }),
            switchMap((savedUser) => {
                // Add mongoDbId to the payload for the second request
                const neo4jUser = {
                    ...newUser,
                    mongoDbId: savedUser._id, // Attach MongoDB _id
                };

                console.log('Payload for Neo4j:', neo4jUser);
                // Second request to Neo4j
                return this.http
                    .post<ApiResponse<IUserInfo>>(`${environment.NEO4J_dataApiUrl}/users`, neo4jUser)
                    .pipe(
                        map((response) => {
                            const savedUserNeo4j = Array.isArray(response.results) ? response.results[0] : response.results;
                            return {
                                savedUser, // Return MongoDB user
                                savedUserNeo4j, // Return Neo4j user
                            };
                        })
                    );
            }),
            tap((finalResult) =>
                console.log('Final Result:', {
                    savedUser: finalResult.savedUser,
                    savedUserNeo4j: finalResult.savedUserNeo4j,
                })
            )
        );
    }
    
    
    deleteUserAsync(id: string): Observable<void> {
        console.log('deleteUserAsync() called with id:', id);
        
        if (!id ) {
            console.error('Invalid IDs provided for deletion');
            throw new Error('Both User ID and MongoDb ID are required to delete user');
        }
    
        const deleteMongoDbUser$ = this.http
            .delete<void>(`${environment.dataApiUrl}/user/${id}`)
            .pipe(
                tap(() => console.log(`User with ID ${id} deleted from MongoDB successfully`)),
                tap(() => console.log('DELETE request sent to MongoDB endpoint:', `${environment.dataApiUrl}/user/${id}`))
            );
    
        const deleteNeo4jUser$ = this.http
            .delete<void>(`${environment.NEO4J_dataApiUrl}/users/${id}`)
            .pipe(
                tap(() => console.log(`User with MongoDbId ${id} deleted from Neo4j successfully`)),
                tap(() => console.log('DELETE request sent to Neo4j endpoint:', `${environment.NEO4J_dataApiUrl}/users/${id}`))
            );
    
        return forkJoin([deleteMongoDbUser$, deleteNeo4jUser$]).pipe(
            tap(() => console.log(`User with ID ${id} and MongoDbId ${id} deleted from both databases`)),
            map(() => void 0) 
        );
    }
    
    
    updateUserAsync(id: string, user: Partial<IUserInfo>): Observable<{
        updatedUser: IUserInfo | undefined;
        updatedUserNeo4j: IUserInfo | undefined;
    }> {
        console.log('updateUserAsync() called with id:', id);
        console.log('Updated user data:', user);
    
        if (!id) {
            console.error('Invalid ID provided for update');
            throw new Error('User ID is required to update user');
        }
    
        // First request: Update user in MongoDB
        return this.http
            .put<ApiResponse<IUserInfo>>(`${environment.dataApiUrl}/user/${id}`, user)
            .pipe(
                tap((response) => console.log('Response from MongoDB update:', response)),
                map((response) => {
                    const updatedUser = response.results;
                    if (!updatedUser || Array.isArray(updatedUser)) {
                        throw new Error('Failed to update user in MongoDB. Invalid response.');
                    }
                    console.log('Updated User in MongoDB:', updatedUser);
                    return updatedUser; // Pass updated user to the next operation
                }),
                switchMap((updatedUser) => {
                    // Prepare the Neo4j payload, including the MongoDB ID if necessary
                    const neo4jPayload = {
                        ...user,
                        mongoDbId: updatedUser._id, // Pass the MongoDB ID to Neo4j if needed
                    };
    
                    console.log('Payload for Neo4j update:', neo4jPayload);
    
                    // Second request: Update user in Neo4j
                    return this.http
                        .put<ApiResponse<IUserInfo>>(
                            `${environment.NEO4J_dataApiUrl}/users/${id}`,
                            neo4jPayload
                        )
                        .pipe(
                            map((response) => {
                                const updatedUserNeo4j = Array.isArray(response.results) ? response.results[0] : response.results;
                                return {
                                    updatedUser,
                                    updatedUserNeo4j,
                                };
                            }),
                            tap((finalResult) =>
                                console.log('Final Result from updates:', finalResult)
                            )
                        );
                })
            );
    }
    
    

    follow(userId: string, followerId: string): Observable<void> {
        const followUserObservable = this.http
            .put<ApiResponse<void>>(`${environment.dataApiUrl}/user/${userId}/follow/${followerId}`, null)
            .pipe(
                tap((response) => console.log('Response from updating user to follow:', response))
            );
    
        const followerUserObservableNeo4j = this.http
            .put<ApiResponse<void>>(`${environment.NEO4J_dataApiUrl}/users/${followerId}/follow/${userId}`, null)
            .pipe(
                tap((response) => console.log('Response from updating followed user:', response))
            );
    

        return forkJoin([followUserObservable, followerUserObservableNeo4j]).pipe(
            tap(() => console.log('Both follow operations complete.')),  // Log once both operations are complete
            map(() => void 0)
        );
    }
    

    unfollow(userId: string, followerId: string): Observable<void> {
        const followUserObservable = this.http
            .put<ApiResponse<void>>(`${environment.dataApiUrl}/user/${userId}/unfollow/${followerId}`, null)
            .pipe(
                tap((response) => console.log('Response from updating user to follow:', response))
            );
    
        const followerUserObservableNeo4j = this.http
            .put<ApiResponse<void>>(`${environment.NEO4J_dataApiUrl}/users/${followerId}/unfollow/${userId}`, null)
            .pipe(
                tap((response) => console.log('Response from updating followed user:', response))
            );
    

        return forkJoin([followUserObservable, followerUserObservableNeo4j]).pipe(
            tap(() => console.log('Both follow operations complete.')),  // Log once both operations are complete
            map(() => void 0)
        );
    }
}
