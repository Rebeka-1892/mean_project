import { Routes } from '@angular/router';
import {authGuard} from './guards/auth.guard';
import { LoginComponent } from './layouts/login-layout/login-layout.component';
import { RoleListComponent } from './components/role/role-list.component';
import { RoleCreateComponent } from './components/role/role-create.component';
import { RoleEditComponent } from './components/role/role-edit.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { UniteListComponent } from './components/unite/unite-list.component';
import { UniteCreateComponent } from './components/unite/unite-create.component';
import { UniteEditComponent } from './components/unite/unite-edit.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { EmployeListComponent } from './components/employe/employe-list.component';
import { EmployeCreateComponent } from './components/employe/employe-create.component';
import { EmployeEditComponent } from './components/employe/employe-edit.component';
//new_import
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'unauthorized', component: UnauthorizedComponent },
      { path: 'roles-edit/:id', component: RoleEditComponent, data: { prerender: false } }, // Désactiver le pré-rendu pour cette route
      { path: 'roles-create', component: RoleCreateComponent },
      { path: 'roles', component: RoleListComponent },
      { path: 'unites-edit/:id', component: UniteEditComponent, data: { prerender: false } }, // Désactiver le pré-rendu pour cette route
      { path: 'unites-create', component: UniteCreateComponent },
      { path: 'unites', component: UniteListComponent },
      { path: 'employes-edit/:id', component: EmployeEditComponent, data: { prerender: false } },
      { path: 'employes-create', component: EmployeCreateComponent },
      { path: 'employes', component: EmployeListComponent },
      //new_path
    ]
  },
  { path: '**', redirectTo: 'login' }
];
