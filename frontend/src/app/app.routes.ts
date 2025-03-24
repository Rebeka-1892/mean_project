import { Routes } from '@angular/router';
import {LoginComponent} from './layouts/login-layout/login-layout.component';
//new_import
export const routes: Routes = [
    // { path: '', redirectTo: 'login', pathMatch: 'full' }  // Redirection  par défaut
    { path: '', redirectTo: 'login' },
    { path: 'login', component: LoginComponent }
];
