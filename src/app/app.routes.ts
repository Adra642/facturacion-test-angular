import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { UserIndexComponent } from './components/user/user-index/user-index.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { ClientIndexComponent } from './components/client/client-index/client-index.component';
import { ClientAddComponent } from './components/client/client-add/client-add.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'user/index',
    component: UserIndexComponent,
    title: 'Indice de Usuarios',
  },
  {
    path: 'user/add',
    component: UserAddComponent,
    title: 'Registrar Usuario',
  },
  {
    path: 'user/edit',
    component: UserEditComponent,
    title: 'Registrar Usuario',
  },
  {
    path: 'client/index',
    component: ClientIndexComponent,
    title: 'Indice de Clientes',
  },
  {
    path: 'client/add',
    component: ClientAddComponent,
    title: 'Registrar Cliente',
  },
];
