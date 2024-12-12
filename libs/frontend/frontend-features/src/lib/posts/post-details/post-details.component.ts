import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {PostService} from '@avans-nx-workshop/frontend-features';
import { IPost } from '@avans-nx-workshop/shared/api';
import { TokenService } from '@avans-nx-workshop/frontend-common';
@Component({
    selector: 'avans-nx-workshop-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PostDetailComponent implements OnInit {
    postId: string | null = null;
    post: IPost | null = null;
    ownerId: string;
    isOwner:boolean = false;
  
    constructor(
      private route: ActivatedRoute,
      private postService: PostService,
      private router: Router,
      private tokenService: TokenService

    ) {
      this.ownerId='';
    }
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.postId = params.get('id');

        if (this.postId === 'new') {
          return;
        }

        console.log('Post ID:', this.postId);
        this.postService.getPostByIdAsync(this.postId).subscribe((post) => {
          if (post) {
            this.post = post;
            this.ownerId = post.ownerId;

            let JWTToken = this.tokenService.getCookie('JWTToken');
            if (JWTToken) {
              let decodedToken = this.tokenService.parseJwt(JWTToken);
              if (decodedToken) {
                this.isOwner = this.ownerId === decodedToken['user_id'];
                console.log("Is Owner: ", this.isOwner);
            }
          }
        }
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
  