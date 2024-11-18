import { Component, OnInit } from '@angular/core';
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';
import {UserService} from '@avans-nx-workshop/frontend-features';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
    users: IUserInfo[] = [];
    constructor(private userService: UserService) {}
    ngOnInit(): void {
        this.users = this.userService.getUsers();
      }

}
