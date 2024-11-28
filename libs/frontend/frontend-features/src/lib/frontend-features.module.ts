import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailComponent } from './posts/post-details/post-details.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule
    ],
    declarations: [UserDetailsComponent, UserListComponent, UserEditComponent,PostListComponent, PostDetailComponent, PostEditComponent],
    exports: [UserDetailsComponent, UserListComponent,UserEditComponent,PostListComponent, PostDetailComponent, PostEditComponent],
})
export class FrontendFeaturesModule {}
