import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { UserAddComponent } from './components/add/user-add/user-add.component';
import { UserIndexComponent } from './components/index/user-index/user-index.component';
import { UserEditComponent } from './components/edit/user-edit/user-edit.component';

import { ProductIndexComponent } from './components/index/product-index/product-index.component';
import { ProductAddComponent } from './components/add/product-add/product-add.component';
import { ProductEditComponent } from './components/edit/product-edit/product-edit.component';

import { CategoryIndexComponent } from './components/index/category-index/category-index.component';
import { CategoryAddComponent } from './components/add/category-add/category-add.component';
import { CategoryEditComponent } from './components/edit/category-edit/category-edit.component';

import { SupplierIndexComponent } from './components/index/supplier-index/supplier-index.component';
import { SupplierAddComponent } from './components/add/supplier-add/supplier-add.component';
import { SupplierEditComponent } from './components/edit/supplier-edit/supplier-edit.component';

import { InvoiceIndexComponent } from './components/index/invoice-index/invoice-index.component';
import { InvoiceAddComponent } from './components/add/invoice-add/invoice-add.component';
import { InvoiceEditComponent } from './components/edit/invoice-edit/invoice-edit.component';
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
    title: 'Índice de Productos',
  },
  {
    path: 'product/add',
    component: ProductAddComponent,
    title: 'Registrar Producto',
  },
  {
    path: 'product/edit/:id',
    component: ProductEditComponent,
    title: 'Editar Producto',
  },
  {
    path: 'category/index',
    component: CategoryIndexComponent,
    title: 'Índice de Categorías',
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
  {
    path: 'supplier/index',
    component: SupplierIndexComponent,
    title: 'Índice de Proveedores',
  },
  {
    path: 'supplier/add',
    component: SupplierAddComponent,
    title: 'Registrar Proveedor',
  },
  {
    path: 'supplier/edit/:id',
    component: SupplierEditComponent,
    title: 'Editar Proveedor',
  },
  {
    path: 'invoice/index',
    component: InvoiceIndexComponent,
    title: 'Índice de Facturas',
  },
  {
    path: 'invoice/add',
    component: InvoiceAddComponent,
    title: 'Registrar Factura',
  },
  {
    path: 'invoice/edit/:id',
    component: InvoiceEditComponent,
    title: 'Editar Factura',
  },
];
