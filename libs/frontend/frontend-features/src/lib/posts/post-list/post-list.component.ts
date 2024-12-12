import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {IPost } from '@avans-nx-workshop/shared/api';
import {PostService} from '@avans-nx-workshop/frontend-features';
import { Subscription } from 'rxjs';
import { TokenService } from '@avans-nx-workshop/frontend-common';
@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PostListComponent implements OnInit, OnDestroy {
    posts: IPost[] | undefined = undefined;
    sub: Subscription = new Subscription();
    loading: boolean = true;
    loggedIn: boolean = false;

    constructor(
      private postService: PostService,
      private tokenService: TokenService,
    ) {}
    ngOnInit(): void {
        this.sub?.add(
            this.postService
            .getPostsAsync()
            .subscribe((posts) => { 
              this.posts = posts; 
              this.loading = false;
            })
        )

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

      ngOnDestroy(): void {
        if (this.sub) {
            console.log("Unsubscribe");
          this.sub.unsubscribe();
        }
          

        console.log("postList on destroy")
      }
}
