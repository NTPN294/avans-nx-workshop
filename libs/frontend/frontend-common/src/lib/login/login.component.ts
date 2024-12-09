import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import {Router } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
    email: string;
    password: string;
    message: string;

    constructor(
        private loginService: LoginService,
        private router: Router,
    ) {
        this.email = '';
        this.password = '';
        this.message = '';
    }


    login() {
        this.loginService.loginAsync(this.email, this.password).subscribe({
            next: (data) => {
                console.log("Login successful:", data);
                this.message = "Login successful!";

                this.router.navigate(['/user-list/' + data.results._id]).then(() => {
                    window.location.reload();
                  })        
                

            },
            error: (error) => {
                console.error("Login failed:", error);
                this.message = "Login failed. Please try again.";
            }
        });
    }
    
}