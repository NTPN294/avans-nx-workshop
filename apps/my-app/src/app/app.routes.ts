import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { UserDetailsComponent, UserEditComponent, UserListComponent } from '@avans-nx-workshop/frontend-features';

export const appRoutes: Route[] = [
    //urls
    {path: 'dashboard', component: DashboardComponent},
    {path: 'about', component: AboutComponent},
    {path: 'user-list', component: UserListComponent},
    {path: 'user-list/:id', component: UserDetailsComponent},
    {path: 'user-list/new', component: UserEditComponent},
    {path: 'user-list/:id/edit', component: UserEditComponent},

    {path:'',pathMatch:'full', redirectTo: 'dashboard'},
];
