import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '@avans-nx-workshop/frontend-features';
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';
import { TokenService } from '@avans-nx-workshop/frontend-common';
@Component({
    selector: 'avans-nx-workshop-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit {
    userId: string | null = null;
    user: IUserInfo = {
      _id: 'New user',
      name: '',
      emailAddress: '',
      password: '',
      gender: UserGender.Unknown,
      role: UserRole.Unknown,
      isActive: true,
      profileImgUrl: '',
    };
        userRoles = Object.values(UserRole);;
    userGenders = Object.values(UserGender);
    userActive = [true, false];

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private tokenService: TokenService
    ) {}
  
    ngOnInit(): void {      
      this.route.paramMap.subscribe((params) => {
        this.userId = params.get('id');
        if (this.userId === 'new') {
          return;
        }
        if (this.userId) {

          let JWTToken = this.tokenService.getCookie('JWTToken');
          if(JWTToken){
          let JWTTokenParsed= this.tokenService.parseJwt(JWTToken);
          if (JWTTokenParsed){
            let userIdCookie = JWTTokenParsed['user_id'];
            if (userIdCookie !== this.userId) {
                this.router.navigate(['/user-list']);
            }
          }
        }
          this.userService.getUserByIdAsync(this.userId).subscribe((user) => {
            if (user) {
              this.user = user;
            }
            this.userRoles = this.userRoles.filter(role => role !== this.user?.role);
            this.userGenders = this.userGenders.filter(gen => gen !== this.user?.gender);
            this.userActive = this.userActive.filter(act => act !== this.user?.isActive);
          });

        } else {
        }
      });
    }
  
    save() {
      if (this.userId === 'new') {
      this.userService.saveUserAsync(this.user).subscribe();
      } else{
        if (this.userId) {
          this.userService.updateUserAsync(this.userId, this.user).subscribe();
        }
      }
      this.router.navigate(['/user-list']);
    }
  }
  
