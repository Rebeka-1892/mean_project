import { Routes } from '@angular/router';
import { LoginComponent } from './layouts/login-layout/login-layout.component';
import { RoleListComponent } from './components/role/role-list.component';
import { RoleCreateComponent } from './components/role/role-create.component';
import { RoleEditComponent } from './components/role/role-edit.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { UniteListComponent } from './components/unite/unite-list.component';
import { UniteCreateComponent } from './components/unite/unite-create.component';
import { UniteEditComponent } from './components/unite/unite-edit.component';
//new_import
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirection par défaut
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'roles-edit/:id', component: RoleEditComponent, data: { prerender: false } }, // Désactiver le pré-rendu pour cette route
      { path: 'roles-create', component: RoleCreateComponent },
      { path: 'roles', component: RoleListComponent },
      { path: 'unites-edit/:id', component: UniteEditComponent },
      { path: 'unites-create', component: UniteCreateComponent },
      { path: 'unites', component: UniteListComponent },
      //new_path
    ]
  },
  // URL pour les URLs inconnues
  { path: '**', redirectTo: 'login' } // Redirection par défaut
];
