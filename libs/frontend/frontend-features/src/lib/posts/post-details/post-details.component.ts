import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {PostService} from '@avans-nx-workshop/frontend-features';
import { IPost } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PostDetailComponent implements OnInit {
    postId: string | null = null;
    post: IPost | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private postService: PostService,
      private router: Router,

    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.postId = params.get('id');

        if (this.postId === 'new') {
          return;
        }

        console.log('Post ID:', this.postId);
        this.postService.getPostByIdAsync(this.postId).subscribe((post) => {
          this.post = post;
        }); 
      });
    }

    delete(){
      if (this.postId) {
        this.postService.deletePostAsync(this.postId).subscribe();
      } else {
        console.error('Post ID is null');
      }
      this.router.navigate(['/post-list']);
    }

    
  }
  