import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '@avans-nx-workshop/frontend-features';
import { IPost, Model, Genre } from '@avans-nx-workshop/shared/api';
import { TokenService } from '@avans-nx-workshop/frontend-common';

@Component({
  selector: 'avans-nx-workshop-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostEditComponent implements OnInit {
  postId: string | null = null;
  post: IPost = {
    _id: 'New Post',
    ownerId: 'New Owner',
    title: '',
    description: '',
    date: new Date(),
    likes: 0,
    comments: [],
    models: [],
  };

  model: Model = {
    title: '',
    description: '',
    genres: [],
    files: [],
    images: [],
  }

  GenreList: string[] = Object.values(Genre) as string[];
  selectedGenres: string[] = [];
  editMode = false;
  currentIndex = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.GenreList = this.GenreList.filter(item => isNaN(Number(item)));

    let JWTToken = this.tokenService.getCookie('JWTToken');
    let userIdCookie: string;
    if (JWTToken) {
      let decodedToken = this.tokenService.parseJwt(JWTToken);
      console.log(decodedToken);
      if (decodedToken) {
        userIdCookie = decodedToken['user_id'] as string;
      }
    } else {
      this.router.navigate(['/post-list']);
    }

    this.route.paramMap.subscribe((params) => {
      this.postId = params.get('id');
      if (this.postId === 'new') {
        this.post.ownerId = userIdCookie;
        return;
      }
      if (this.postId) {
        this.postService.getPostByIdAsync(this.postId).subscribe((post) => {
          if (post) {
            this.post = post;

            if (this.post.ownerId !== userIdCookie) {
              this.router.navigate(['/post-list']);
            }

          }
        });

      } else {
      }
    });
  }

  save() {
    if (this.postId === 'new') {
      this.postService.savePostAsync(this.post).subscribe();
    }
    else {
      if (this.postId) {
        this.postService.updatePostAsync(this.postId, this.post).subscribe();
      }
    }
    this.router.navigate(['/post-list']);
  }

  openModel() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModel() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
    this.model = {
      title: '',
      description: '',
      genres: [],
      files: [],
      images: [],
    }
    this.selectedGenres = [];
    this.editMode = false;
  }

  saveModel() {
    this.post.models.push(this.model);
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
    this.model = {
      title: '',
      description: '',
      genres: [],
      files: [],
      images: [],
    }


  }

  toggleGenreSelection(event: any, genre: string) {
    if (event.target.checked) {
      this.model.genres.push(genre as unknown as Genre);
    } else {
      const index = this.model.genres.indexOf(genre as unknown as Genre);
      if (index > -1) {
        this.model.genres.splice(index, 1);
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.model.files = [];
    if (input.files) {
      Array.from(input.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64WithMeta = e.target!.result as string;

          const base64Data = base64WithMeta.replace(/^data:([A-Za-z-+/]+);base64,/, '');

          this.model.files.push(base64Data);
        };
        reader.readAsDataURL(file);
      });
    }
  }



  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.model.images = [];
    if (input.files) {
      Array.from(input.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target!.result as string;
          this.model.images.push(base64);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  editModel(index: number) {
    this.editMode = true;
    this.currentIndex = index;

    this.model = this.post.models[index];
    this.selectedGenres = this.model.genres.map((genre) => genre.toString());
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  saveModel2() {
    this.post.models.splice(this.currentIndex, 1);
    this.post.models.push(this.model);
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
    this.model = {
      title: '',
      description: '',
      genres: [],
      files: [],
      images: [],
    }
    this.selectedGenres = [];
    this.editMode = false;

  }

  deleteModel(index: number) {
    this.post.models.splice(index, 1);
  }

}

