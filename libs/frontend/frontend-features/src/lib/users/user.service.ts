import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';

@Injectable({
    providedIn: 'root',
  })
  export class UserService {
    readonly users: IUserInfo[] = [
      {
          _id: "1",
          name: 'Eerste',
          emailAddress: 'usereen@host.com',
          role: UserRole.Admin,
          profileImgUrl: 'https://api-private.atlassian.com/users/3ed7bde5a8c78e8d0d38eca297f62495/avatar',
          gender: UserGender.Male,
          isActive: false,
          password: '1234'
      },
      {
        _id: "2",
        name: 'tweede',
        emailAddress: 'usereen2@host.com',
        role: UserRole.Admin,
        profileImgUrl: 'https://api-private.atlassian.com/users/3ed7bde5a8c78e8d0d38eca297f62495/avatar',
        gender: UserGender.Male,
        isActive: false,
        password: '1234'
    },
    {
        _id: "3",
        name: 'derde',
        emailAddress: 'usereen3@host.com',
        role: UserRole.Admin,
        profileImgUrl: 'https://api-private.atlassian.com/users/3ed7bde5a8c78e8d0d38eca297f62495/avatar',
        gender: UserGender.Male,
        isActive: false,
        password: '1234'
    }
    ];
  
    constructor() {
      console.log('Service constructor aangeroepen');
      console.log(this.users);
    }
  
    getUsers(): IUserInfo[] {
      console.log('getUsers aangeroepen');
      return this.users;
    }
  
    getUsersAsObservable(): Observable<IUserInfo[]> {
      console.log('getUsersAsObservable aangeroepen');
      // 'of' is een rxjs operator die een Observable
      // maakt van de gegeven data.
      return of(this.users);
    }
  
    getUserById(id: number): IUserInfo {
      console.log('getUserById aangeroepen');
      return this.users.filter((user) => user._id === id.toString())[0];
    }

    getUsersAsync(): Observable<IUserInfo[]> {
        console.log('getUsersAsync aangeroepen');
       return of (this.users).pipe(delay(2000));
      }
  }
  