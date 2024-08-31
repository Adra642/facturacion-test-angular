import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { UserAddComponent } from './components/user/user-add/user-add.component';
import { UserIndexComponent } from './components/user/user-index/user-index.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';

import { ProductIndexComponent } from './components/product/product-index/product-index.component';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';

import { CategoryIndexComponent } from './components/category/category-index/category-index.component';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';

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
    path: 'user/edit/:id',
    component: UserEditComponent,
    title: 'Editar Usuario',
  },
  {
    path: 'product/index',
    component: ProductIndexComponent,
    title: 'Índice de productos',
  },
  {
    path: 'product/add',
    component: ProductAddComponent,
    title: 'Registrar producto',
  },
  {
    path: 'product/edit/:id',
    component: ProductEditComponent,
    title: 'Editar Producto',
  },
  {
    path: 'category/index',
    component: CategoryIndexComponent,
    title: 'Índice de Categoría',
  },
  {
    path: 'category/add',
    component: CategoryAddComponent,
    title: 'Registrar Categoría',
  },
  {
    path: 'category/edit/:id',
    component: CategoryEditComponent,
    title: 'Editar Categoría',
  },
];
