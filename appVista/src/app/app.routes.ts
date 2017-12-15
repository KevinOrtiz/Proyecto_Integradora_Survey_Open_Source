import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HOME_ROUTES } from './components/home/home.routes';

const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {
        path: 'home', component: HomeComponent,
        children: HOME_ROUTES
    },
    {path: '**', pathMatch: 'full', redirectTo: 'login'}
] ;

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES) ;

