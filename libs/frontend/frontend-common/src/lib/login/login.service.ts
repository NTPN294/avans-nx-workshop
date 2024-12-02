import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, Observable, of } from 'rxjs';
import { environment} from '@avans-nx-workshop/shared/util-env';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private http: HttpClient) {
        console.log('UserService created');
    }

    loginAsync(emailAddress: string, password: string): Observable<any> {
        let token = '';
        console.log('loginAsync() called with email:', emailAddress, 'and password:', password);
        return this.http
            .post<any>(environment.dataApiUrl + '/auth/login', { emailAddress, password })
            .pipe(
                tap((response) => console.log('Response from API:', response)),
                map((response) => {
                    token = response.results.token;
                    if (!token) {
                        throw new Error('Token not found in the response');
                    }
                    console.log(response);

                      // Save the token in a cookie with the name 'JWTToken'
                      document.cookie = `JWTToken=${token}; path=/; secure; samesite=Strict;`;
                      document.cookie= `userId=${response.results._id}; path=/; secure; samesite=Strict;`;
                    return response;
                })
            );
        
    }
}