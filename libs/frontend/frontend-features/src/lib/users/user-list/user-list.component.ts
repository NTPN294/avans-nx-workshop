import { Component } from '@angular/core';
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
})
export class UserListComponent {

    users: IUserInfo[] = [
        {_id: "1", name: "nick nick", emailAddress: "nick@nick.nl", role: UserRole.Admin, gender: UserGender.Male, password: "password", profileImgUrl: "https://www.google.com", isActive: true},
        {_id: "2", name: "nick2 nick2", emailAddress: "nick2@nick.nl", role: UserRole.Admin, gender: UserGender.Male, password: "password", profileImgUrl: "https://www.google.com", isActive: true},
]
}
