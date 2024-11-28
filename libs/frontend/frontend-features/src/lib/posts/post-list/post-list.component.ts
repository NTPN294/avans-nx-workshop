import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {IPost } from '@avans-nx-workshop/shared/api';
import {PostService} from '@avans-nx-workshop/frontend-features';
import { Subscription } from 'rxjs';

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

    constructor(private postService: PostService) {}
    ngOnInit(): void {
        this.sub?.add(
            this.postService
            .getPostsAsync()
            .subscribe((posts) => { 
              this.posts = posts; 
              this.loading = false;
            })
        )
        // this.users = this.userService.getUsers();
      }

      ngOnDestroy(): void {
        if (this.sub) {
            console.log("Unsubscribe");
          this.sub.unsubscribe();
        }
          

        console.log("postList on destroy")
      }
}
