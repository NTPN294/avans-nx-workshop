import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {PostService} from '@avans-nx-workshop/frontend-features';
import { IPost } from '@avans-nx-workshop/shared/api';
@Component({
    selector: 'avans-nx-workshop-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
      encapsulation: ViewEncapsulation.None
    
})
export class DashboardComponent implements OnInit{
    posts: IPost[] | undefined = undefined;

    constructor(
        private postService: PostService,
    ) { }

    ngOnInit(): void {
        this.postService.getPostsAsync().subscribe((posts) => {
            this.posts = posts;
            console.log('Posts:', this.posts);
        });
    }

}
