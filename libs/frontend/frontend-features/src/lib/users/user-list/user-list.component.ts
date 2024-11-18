import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';
import {UserService} from '@avans-nx-workshop/frontend-features';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit, OnDestroy {
    users: IUserInfo[] | undefined = undefined;
    sub: Subscription = new Subscription();

    constructor(private userService: UserService) {}
    ngOnInit(): void {
        this.sub?.add(
            this.userService
            .getUsersAsync()
            .subscribe((users) => { this.users = users; })
        )
        // this.users = this.userService.getUsers();
      }

      ngOnDestroy(): void {
        if (this.sub) {
            console.log("Unsubscribe");
          this.sub.unsubscribe();
        }
          

        console.log("userlist on destroy")
      }
}
