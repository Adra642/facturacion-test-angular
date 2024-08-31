import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Product } from '../../../interfaces/product';

const ELEMENT_DATA: Product[] = [
  {
    id: 1,
    code: '001',
    name: 'Producto A',
    description: 'Descripción del Producto A',
    price: 100.0,
    stock: 50,
    category: 'Categoría 1',
    supplier: 'Proveedor X',
    state: true,
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
    state: true,
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
    state: true,
  },
];
@Component({
  selector: 'app-product-index',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
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
    'state',
    'actions',
  ];
  headerTitles: { [key: string]: string } = {
    id: 'Id',
    code: 'Código',
    name: 'Nombre',
    description: 'Descripción',
    price: 'Precio',
    stock: 'Stock',
    category: 'Categoría',
    supplier: 'Proveedor',
    state: 'Estado',
    actions: 'Acciones',
  };
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    // Lógica para eliminar el registro con el ID proporcionado
    console.log('Delete ID:', id);
  }
}
