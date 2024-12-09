import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'avans-nx-workshop-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit{
    loggedIn: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
        let token = getCookie('JWTToken');
        if (token) {
            this.loggedIn = true;
    }
}

}

function getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((row) => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
}