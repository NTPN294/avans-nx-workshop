import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {UserService} from '@avans-nx-workshop/frontend-features';
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class UserDetailsComponent implements OnInit {
    userId: string | null = null;
    user: IUserInfo | null = null;
    isOwner: boolean = false;
  
    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private router: Router,

    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.userId = params.get('id');

        if (this.userId === 'new') {
          return;
        }

        console.log('User ID:', this.userId);
        this.userService.getUserByIdAsync(this.userId).subscribe((user) => {
          this.user = user;
          let userIdCookie = getCookie('userId');
          if (userIdCookie === this.userId) {
            this.isOwner = true;
          }
        }); 


      });
    }

    delete(){
      if (this.userId) {
        this.userService.deleteUserAsync(this.userId).subscribe();
      } else {
        console.error('User ID is null');
      }
      this.router.navigate(['/user-list']);
    }

    
  }

  function getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((row) => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
}
  