import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from '@avans-nx-workshop/frontend-features';
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';
import { Router } from '@angular/router';

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
        private router: Router
    ) { }

    ngOnInit() { 
        this.userId = getCookie('userId');
        this.userService.getUserByIdAsync(this.userId).subscribe((user) => {
            this.user = user;
          });     
        }

        logOut() {
            deleteAllCookies();
            this.router.navigate(['/login']).then(() => {
                window.location.reload();
              });        
            }

        edit(){
            this.router.navigate(['/user-list/' + this.userId + '/edit']);
        }
}


function getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((row) => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
}

function deleteAllCookies(): void {
    const cookies = document.cookie.split(";");
  
    for (const cookie of cookies) {
      const [name] = cookie.split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }
  