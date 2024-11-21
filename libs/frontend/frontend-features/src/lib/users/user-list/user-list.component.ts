import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';
import {UserService} from '@avans-nx-workshop/frontend-features';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit, OnDestroy {
    users: IUserInfo[] | undefined = undefined;
    sub: Subscription = new Subscription();
    loading: boolean = true;

    constructor(private userService: UserService) {}
    ngOnInit(): void {
        this.sub?.add(
            this.userService
            .getUsersAsync()
            .subscribe((users) => { 
              this.users = users; 
              this.loading = false;
            })
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
