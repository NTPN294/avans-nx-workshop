import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      private userService: UserService
    ) {}
  
    ngOnInit(): void {
      // Deze manier is statisch: bij navigatie krijgen we niet de nieuwe id uit de URL.
      // this.userId = this.route.snapshot.paramMap.get('id');
  
      // Deze manier maakt gebruik van RxJs Observables.
      // We komen hier bij services en HTTP op terug.
      this.route.paramMap.subscribe((params) => {
        this.userId = params.get('id');
        console.log('User ID:', this.userId);
        this.userService.getUserByIdAsync(this.userId).subscribe((user) => {
          this.user = user;
        }); // Waarom 'Number'?
      });
    }
  }
  