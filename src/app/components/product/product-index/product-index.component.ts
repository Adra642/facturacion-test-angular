import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { User } from '../../../interfaces/user';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

const ELEMENT_DATA: User[] = [
  {
    id: 1,
    code: '001',
    name: 'Producto A',
    description: 'Descripción del Producto A',
    price: 100.0,
    stock: 50,
    category: 'Categoría 1',
    supplier: 'Proveedor X',
    state: true
},
{
    id: 2,
    code: '002',
    name: 'Producto B',
    description: 'Descripción del Producto B',
    price: 150.0,
    stock: 30,
    category: 'Categoría 2',
    supplier: 'Proveedor Y',
    state: true
},
{
    id: 3,
    code: '003',
    name: 'Producto C',
    description: 'Descripción del Producto C',
    price: 200.0,
    stock: 20,
    category: 'Categoría 3',
    supplier: 'Proveedor Z',
    state: true
},

];
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatIcon,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './product-index.component.html',
  styleUrl: './product-index.component.css',
})
export class ProductIndexComponent {
  displayedColumns: string[] = [
    'id',
    'code',
    'name',
    'description',
    'price',
    'stock',
    'category',
    'supplier',
    'state'
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}