import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '@avans-nx-workshop/frontend-features';
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-user-edit',
    templateUrl: './user-edit.component.html',
    styles: []
})
export class UserEditComponent implements OnInit {
    userId: string | null = null;
    user: IUserInfo | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService
    ) {}
  
    ngOnInit(): void {
      /**
       * We gebruiken de EditComponent om een bestaande record te wijzigen
       * én om een nieuwe record te maken.
       * Een bestaande record heeft een :id in de URL, bv '/users/1/edit'
       * Als die er dus is gaan we de user ophalen en bewerken.
       * Als er geen :id in de URL zit (via '/users/new') maken we een nieuwe record.
       */
      this.route.paramMap.subscribe((params) => {
        this.userId = params.get('id');
        if (this.userId) {
          // Bestaande user
          this.user = this.userService.getUserById(Number(this.userId));
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
  