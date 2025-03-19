import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
//new_import
export const routes: Routes = [
    // { path: '', redirectTo: 'login', pathMatch: 'full' }  // Redirection  par défaut
    { path: '', component: LoginComponent }
    //new_path
];
