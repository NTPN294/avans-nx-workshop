import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { PostListComponent, UserDetailsComponent, UserEditComponent, UserListComponent, PostDetailComponent, PostEditComponent } from '@avans-nx-workshop/frontend-features';
import { AccountComponent, LoginComponent } from '@avans-nx-workshop/frontend-common';

export const appRoutes: Route[] = [
    //urls
    {path: '', component: DashboardComponent},
    {path: 'about', component: AboutComponent},
    {path: 'user-list', component: UserListComponent},
    {path: 'user-list/:id', component: UserDetailsComponent},
    {path: 'user-list/new', component: UserEditComponent},
    {path: 'user-list/:id/edit', component: UserEditComponent},

    {path: 'post-list',component:PostListComponent},
    {path: 'post-list/:id', component: PostDetailComponent},
    {path: 'post-list/new', component: PostEditComponent},
    {path: 'post-list/:id/edit', component: PostEditComponent},

    {path: 'login', component: LoginComponent},
    {path: 'account', component: AccountComponent},

    {path:'',pathMatch:'full', redirectTo: ''},
];
