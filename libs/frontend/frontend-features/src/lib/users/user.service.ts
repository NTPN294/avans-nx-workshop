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
import { environment } from '@avans-nx-workshop/shared/util-env';

@Injectable({ providedIn: 'root' })
export class UserService {



    constructor(private http: HttpClient) {
        console.log('UserService created');
    }

    // public getUsers(): IUserInfo[] {
    //     return this.users;
    // }

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

    // public getUserById(id: Id): IUserInfo {
    //     return this.users.filter((user) => user._id === id)[0];
    // }
    
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
    
}
