import { Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Id, IPost } from '@avans-nx-workshop/shared/api';
import { PostService } from '@avans-nx-workshop/frontend-features';
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
    filteredPosts: IPost[] | undefined = undefined; // Store filtered posts
    sub: Subscription = new Subscription();
    loading: boolean = true;
    loggedIn: boolean = false;
    selectedOption: string = 'Recent';
    currentUserId: string = '';
    recommendedPostIds: string[] = [];

    constructor(
        private postService: PostService,
        private tokenService: TokenService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.sub?.add(
            this.postService
            .getPostsAsync()
            .subscribe((posts) => { 
                this.posts = posts;
                this.loading = false;
                this.filteredPosts = posts; // Initially, all posts are shown
            })
        );

        this.filterPostsByDate();

        let token = this.tokenService.getCookie('JWTToken');
        if (token) {
            const jwtObject = this.tokenService.parseJwt(token);
            if (jwtObject) {
                console.log(jwtObject['exp']);
                if (this.tokenService.isJwtExpired(jwtObject['exp'] as number)) {
                    console.error("JWT Token is expired");
                    return;
                }
                this.currentUserId = jwtObject['user_id'] as string;
                this.loggedIn = true;
            }
        }
    }

    ngOnDestroy(): void {
        if (this.sub) {
            console.log("Unsubscribe");
            this.sub.unsubscribe();
        }

        console.log("postList on destroy");
    }

    onOptionChange(event: Event): void {
        const selectElement = event.target as HTMLSelectElement;
        this.selectedOption = selectElement.value;
        console.log('Selected Option:', this.selectedOption);

        if (this.selectedOption === 'Recent') {
            this.filterPostsByDate();
        } else if (this.selectedOption === 'Popular') {
            this.filterPostsByLikes();
        } else if (this.selectedOption === 'Recommended') {
            this.getRecommendedPosts();
        }

        this.cdr.detectChanges();
    }

    filterPostsByDate(): void {
        this.postService.getPostsAsync().subscribe((posts) => {
            this.filteredPosts = posts;
            this.filteredPosts?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
   
        });
    }

    filterPostsByLikes(): void {
        this.postService.getPostsAsync().subscribe((posts) => {
            this.filteredPosts = posts;
            this.filteredPosts?.sort((a, b) => b.likes - a.likes);

        });
    }

    getRecommendedPosts(): void {
        if (!this.currentUserId) {
            this.postService.getPostsAsync().subscribe((posts) => {
                this.filteredPosts = posts;
                this.filteredPosts?.sort((a, b) => b.likes - a.likes);
    
            });
            return;
        }
        this.postService.getRecommendedPostsAsync(this.currentUserId).subscribe(
            (rcmndIds) => {
                const recommendedPostIds = rcmndIds;
                console.log('Recommended Post Ids:', recommendedPostIds);
                
                this.filteredPosts = this.posts?.filter((post: any) => recommendedPostIds.includes(post._id));
                         
            },
            (error) => {
                console.error('Error fetching recommended posts:', error);
            }
        );
    }
}
