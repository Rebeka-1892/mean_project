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
import { MaterielListComponent } from './components/materiel/materiel-list.component';
import { MaterielCreateComponent } from './components/materiel/materiel-create.component';
import { MaterielEditComponent } from './components/materiel/materiel-edit.component';
import { ServiceListComponent } from './components/service/service-list.component';
import { ServiceCreateComponent } from './components/service/service-create.component';
import { ServiceEditComponent } from './components/service/service-edit.component';
import { PosteListComponent } from './components/poste/poste-list.component';
import { PosteCreateComponent } from './components/poste/poste-create.component';
import { PosteEditComponent } from './components/poste/poste-edit.component';
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
      { path: 'roles-edit/:id', component: RoleEditComponent, data: { prerender: false } },
      { path: 'roles-create', component: RoleCreateComponent },
      { path: 'roles', component: RoleListComponent },
      { path: 'unites-edit/:id', component: UniteEditComponent, data: { prerender: false } },
      { path: 'unites-create', component: UniteCreateComponent },
      { path: 'unites', component: UniteListComponent },
      { path: 'employes-edit/:id', component: EmployeEditComponent, data: { prerender: false } },
      { path: 'employes-create', component: EmployeCreateComponent },
      { path: 'employes', component: EmployeListComponent },
      { path: 'materiels-edit/:id', component: MaterielEditComponent, data: { prerender: false } },
      { path: 'materiels-create', component: MaterielCreateComponent },
      { path: 'materiels', component: MaterielListComponent },
      { path: 'services-edit/:id', component: ServiceEditComponent, data: { prerender: false } },
      { path: 'services-create', component: ServiceCreateComponent },
      { path: 'services', component: ServiceListComponent },
      { path: 'postes-edit/:id', component: PosteEditComponent, data: { prerender: false } },
      { path: 'postes-create', component: PosteCreateComponent },
      { path: 'postes', component: PosteListComponent },
      //new_path
    ]
  },
  { path: '**', redirectTo: 'login' }
];
