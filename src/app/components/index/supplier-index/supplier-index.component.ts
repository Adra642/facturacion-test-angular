import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Supplier } from '../../../interfaces/supplier';

const ELEMENT_DATA: Supplier[] = [
  {
    id: 1,
    ruc: '12345678901',
    name: 'Proveedor Uno',
    email: 'proveedor1@example.com',
    phone: '123-456-7890',
    address: 'Calle Falsa 123',
  },
  {
    id: 2,
    ruc: '23456789012',
    name: 'Proveedor Dos',
    email: 'proveedor2@example.com',
    phone: '234-567-8901',
    address: 'Avenida 742',
  },
  {
    id: 3,
    ruc: '34567890123',
    name: 'Proveedor Tres',
    email: 'proveedor3@example.com',
    phone: '345-678-9012',
    address: 'Boulevard 456',
  },
];
@Component({
  selector: 'app-supplier-index',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIcon,
    MatPaginatorModule,
    MatTableModule,
    RouterLink,
  ],
  templateUrl: './supplier-index.component.html',
  styleUrl: './supplier-index.component.css',
})
export class SupplierIndexComponent {
  displayedColumns: string[] = [
    'id',
    'ruc',
    'name',
    'email',
    'phone',
    'address',
    'actions',
  ];

  headerTitles: { [key: string]: string } = {
    id: 'Id',
    ruc: 'RUC',
    name: 'Nombre',
    email: 'Correo Electrónico',
    phone: 'Teléfono',
    address: 'Dirección',
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
