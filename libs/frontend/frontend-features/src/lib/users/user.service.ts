import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    Id,
    ApiResponse,
    IUserInfo,
    UserGender,
    UserRole
} from '@avans-nx-workshop/shared/api';
import { map, tap, Observable, of } from 'rxjs';
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
    

    saveUserAsync(user: IUserInfo): Observable<IUserInfo> {
        let newUser = {
            name: user.name,
            emailAddress: user.emailAddress,
            password: user.password,
            gender: user.gender,
            role: user.role,
            isActive: user.isActive,
            profileImgUrl: user.profileImgUrl,
        };

        console.log(newUser);
        console.log('Sending request to:', `${environment.dataApiUrl}/user`); 

        return this.http
            .post<ApiResponse<IUserInfo>>(`${environment.dataApiUrl}/user`, newUser)
            .pipe(
                tap((response) => console.log('Response from save user:', response)),
                map((response) => {
                    const savedUser = response.results;
                    if (!savedUser || Array.isArray(savedUser)) {
                        throw new Error('Failed to save user. Invalid response.');
                    }
                    return savedUser;
                }),
                tap((savedUser) => console.log('Saved user:', savedUser)),
            );
    }
    
    deleteUserAsync(id: string): Observable<void> {
        console.log('deleteUserAsync() called with id:', id);
    
        if (!id) {
            console.error('Invalid ID provided for deletion');
            return of(); 
        }
    
        return this.http
            .delete<void>(`${environment.dataApiUrl}/user/${id}`)
            .pipe(
                tap(() => console.log(`User with ID ${id} deleted successfully`)),
                tap(() => console.log('DELETE request sent to:', `${environment.dataApiUrl}/user/${id}`))
            );
    }
    
    updateUserAsync(id: string, user: Partial<IUserInfo>): Observable<IUserInfo> {
        console.log('updateUserAsync() called with id:', id);
        console.log('Updated user data:', user);
    
        if (!id) {
            console.error('Invalid ID provided for update');
            throw new Error('User ID is required to update user');
        }
    
        return this.http
            .put<ApiResponse<IUserInfo>>(`${environment.dataApiUrl}/user/${id}`, user)
            .pipe(
                tap((response) => console.log('Response from update user:', response)),
                map((response) => {
                    const updatedUser = response.results;
                    if (!updatedUser || Array.isArray(updatedUser)) {
                        throw new Error('Failed to update user. Invalid response.');
                    }
                    return updatedUser;
                }),
                tap((updatedUser) => console.log('Updated user:', updatedUser)),
            );
    }
    

}
