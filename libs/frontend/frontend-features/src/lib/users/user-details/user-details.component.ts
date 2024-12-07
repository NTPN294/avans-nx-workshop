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
  