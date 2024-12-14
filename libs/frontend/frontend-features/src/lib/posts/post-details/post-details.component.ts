import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {PostService, UserService} from '@avans-nx-workshop/frontend-features';
import { IPost, IUserInfo } from '@avans-nx-workshop/shared/api';
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
    formattedDate: string = '';

    commentText: string = '';
    ratings: number[] = [1, 2, 3, 4, 5]; 
    selectedRating: number = 1;

    user: IUserInfo | null = null;
    currentUserId: String | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private postService: PostService,
      private router: Router,
      private tokenService: TokenService,
      private userService: UserService,

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

            const dateConverted = new Date(this.post.date);
            const options: Intl.DateTimeFormatOptions = {
              day: "2-digit",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            };
            this.formattedDate = dateConverted.toLocaleDateString("en-GB", options);

            let JWTToken = this.tokenService.getCookie('JWTToken');
            if (JWTToken) {
              let decodedToken = this.tokenService.parseJwt(JWTToken);
              if (decodedToken) {
                this.isOwner = this.ownerId === decodedToken['user_id'];
                this.currentUserId = decodedToken['user_id'] as String;
                console.log("Is Owner: ", this.isOwner);
            }
          }

          this.userService.getUserByIdAsync(this.post.ownerId).subscribe((user) => {
            this.user = user;
          });

          
          
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

    downloadFiles(i: number): void {
      let files = this.post?.models[i].files;
      if (files) {
        files.forEach((base64) => {
          // Strip the base64 part directly (assuming the data is just base64 without MIME type)
          const base64Data = base64;
    
          // Decode the base64 string to binary data
          const binaryString = atob(base64Data);
          const byteNumbers = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            byteNumbers[i] = binaryString.charCodeAt(i);
          }
    
          // Create a Blob with the binary data and set the MIME type to "application/octet-stream"
          const fileBlob = new Blob([byteNumbers], { type: 'application/octet-stream' });
    
          // Create a URL for the Blob object
          const blobURL = URL.createObjectURL(fileBlob);
    
          // Create an <a> element
          const link = document.createElement('a');
          link.href = blobURL;
          link.download = 'file.stl'; // The filename to use for the download
          link.style.display = 'none'; // Hide the link
    
          // Append the link to the body, trigger the download, then remove it
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
    
          // Cleanup Blob URL to free up memory
          URL.revokeObjectURL(blobURL);
        });
      }
    }
    

    likePost(){
      if (!this.currentUserId) {
        alert('Please log in first');
        return;
      }

      console.log(this.postId);
      console.log(this.user?._id);

      this.userService.getUserByIdAsync(this.currentUserId as string).subscribe((currentUser) => {
        if (currentUser?.likedPosts.includes(this.postId as string)) {
          alert('You have already liked this post.');
          return;
        }

        this.postService.likePostAsync(this.postId as string, this.currentUserId as string).subscribe(() => {
          alert('You have liked this post.');
        });
      });
    }
    
    
   
  
    submitComment(): void {
      if (!this.currentUserId) {
        alert('Please log in first');
        return;
      }

      console.log(this.commentText + " - " + this.selectedRating);
      this.postService.commentPostAsync(this.postId as string, this.commentText, this.selectedRating, this.currentUserId).subscribe();
    }

    formatDate(date: Date): string {
      const dateConverted = new Date(date);
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      };
      return dateConverted.toLocaleDateString("en-GB", options);
    }

}
  