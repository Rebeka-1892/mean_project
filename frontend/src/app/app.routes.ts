import { Routes } from '@angular/router';
import {LoginComponent} from './layouts/login-layout/login-layout.component';
import { RoleListComponent } from './components/role/role-list.component';
import { RoleCreateComponent } from './components/role/role-create.component';
import { RoleEditComponent } from './components/role/role-edit.component';
//new_import
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirection  par défaut,
    { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Redirection  par défaut,
    { path: 'login', component: LoginComponent },    
    { path: 'roles-edit/:id', component: RoleEditComponent },
    { path: 'roles-create', component: RoleCreateComponent }, 
    { path: 'roles', component: RoleListComponent },
    //new_path
];
