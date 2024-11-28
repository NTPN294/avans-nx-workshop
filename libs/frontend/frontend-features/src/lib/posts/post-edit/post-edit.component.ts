import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {PostService} from '@avans-nx-workshop/frontend-features';
import { IPost } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-post-edit',
    templateUrl: './post-edit.component.html',
    styleUrls: ['./post-edit.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PostEditComponent implements OnInit {
    postId: string | null = null;
    post: IPost = {
      _id: 'Nieuwe gebruiker',
      title: '',
      description: '',
      date: new Date(),
      likes: 0,
    };

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private postService: PostService
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.postId = params.get('id');
        if (this.postId === 'new') {
          return;
        }
        if (this.postId) {
          this.postService.getPostByIdAsync(this.postId).subscribe((post) => {
            if (post) {
              this.post = post;
            }
           
          });

        } else {
        }
      });
    }
  
    save() {
      if (this.postId === 'new') {
      this.postService.savePostAsync(this.post).subscribe();
      } else{
        if (this.postId) {
          this.postService.updatePostAsync(this.postId, this.post).subscribe();
        }
      }
      this.router.navigate(['/post-list']);
    }
  }
  