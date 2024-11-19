import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '@avans-nx-workshop/frontend-features';
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit {
    userId: string | null = null;
    user: IUserInfo | null = null;
    userRoles = Object.values(UserRole);;
    userGenders = Object.values(UserGender);
    userActive = [true, false];

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.userId = params.get('id');
        if (this.userId) {
          // Bestaande user
          this.user = this.userService.getUserById(Number(this.userId));
          this.userRoles = this.userRoles.filter(role => role !== this.user?.role);
          this.userGenders = this.userGenders.filter(gen => gen !== this.user?.gender);
          this.userActive = this.userActive.filter(act => act !== this.user?.isActive);

        } else {
          // Nieuwe user
          this.user = null;
        }
      });
    }
  
    save() {
      console.log('Hier komt je save actie');
      this.router.navigate(['..'], { relativeTo: this.route });
    }
  }
  