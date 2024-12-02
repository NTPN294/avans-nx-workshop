import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';

@Component({
    selector: 'avans-nx-workshop-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
    email: string;
    password: string;

    constructor(private loginService: LoginService) {
        this.email = '';
        this.password = '';

    }


    login(){
        this.loginService.loginAsync(this.email, this.password).subscribe();
    }
}