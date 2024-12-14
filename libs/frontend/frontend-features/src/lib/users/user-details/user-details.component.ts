import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {UserService} from '@avans-nx-workshop/frontend-features';
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';
import {TokenService} from '@avans-nx-workshop/frontend-common';
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
    isFollowing: boolean = false;
    currentUserId: string | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private router: Router,
      private tokenService: TokenService

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
          let JWTToken = this.tokenService.getCookie('JWTToken');
          if(JWTToken){
          let JWTTokenParsed= this.tokenService.parseJwt(JWTToken);
          if (JWTTokenParsed){
            let userIdCookie = JWTTokenParsed['user_id'] as string;
            this.currentUserId = userIdCookie;
            console.log('User ID from JWT:', this.currentUserId);
            if (userIdCookie === this.userId) {
              this.isOwner = true;
            }

            this.userService.getUserByIdAsync(this.currentUserId).subscribe((currentUser) => {
              if(currentUser){
                this.isFollowing = currentUser.following.includes(this.userId as string);
                console.log("following:", currentUser.following);
                console.log('Is following:', this.isFollowing);
              }
            });


          }
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
      this.tokenService.deleteAllCookies();
      this.router.navigate(['/user-list']);
    }

    follow(): void {
      if (!this.currentUserId) {
        alert('Please log in first');
        return;
      }
      this.userService.follow(this.userId as string, this.currentUserId as string).subscribe(
        () => {
          location.reload();
        },
        error => {
          console.error('Follow action failed', error);
        }
      );
    }
    

    unfollow(){
      this.userService.unfollow(this.userId as string, this.currentUserId as string).subscribe(
        () => {
          location.reload();
        },
        error => {
          console.error('Follow action failed', error);
        }
      );
    }
    
  }


  