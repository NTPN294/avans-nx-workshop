import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TokenService } from '@avans-nx-workshop/frontend-common';

@Component({
    selector: 'avans-nx-workshop-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit{
    loggedIn: boolean = false;

    constructor(private tokenService: TokenService) {
    }

    ngOnInit(): void {
        console.log("HeaderComponent initialized");
        let token = this.tokenService.getCookie('JWTToken');

        if (token) {
            const jwtObject = this.tokenService.parseJwt(token);
            if (jwtObject) {
            console.log(jwtObject['exp']);
            if (this.tokenService.isJwtExpired(jwtObject['exp'] as number)) {
                console.error("JWT Token is expired");
                return
            }
            this.loggedIn = true;
          }
        }
    
}

}

