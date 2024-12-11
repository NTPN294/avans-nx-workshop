import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from '@avans-nx-workshop/frontend-features';
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';
import { Router } from '@angular/router';
import { TokenService } from '@avans-nx-workshop/frontend-common';

@Component({
    selector: 'avans-nx-workshop-account',
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
    encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {
    user: IUserInfo | null = null;
    userId: string | null = null;
    constructor(
        private userService: UserService,
        private router: Router,
        private tokenService: TokenService
    ) { }

    ngOnInit() { 
        this.userId = this.tokenService.getCookie('userId');
        this.userService.getUserByIdAsync(this.userId).subscribe((user) => {
            this.user = user;
          });     
        }

        logOut() {
            this.tokenService.deleteAllCookies();
            this.router.navigate(['/login']).then(() => {
                window.location.reload();
              });        
            }

        edit(){
            this.router.navigate(['/user-list/' + this.userId + '/edit']);
        }
}



  