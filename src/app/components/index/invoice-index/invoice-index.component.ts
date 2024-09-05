import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Invoice } from '../../../interfaces/invoice';

const ELEMENT_DATA: Invoice[] = [
  {
    id: 1,
    number: 260,
    issueDate: new Date('2024-03-12'),
    userName: 'Carlos Augusto',
    subtotal: 124,
    tax: 8,
    total: 560,
    discount:23,
    paymentMethod: 'tarjeta de Débito',
    status: true,
  },
  {
    id: 2,
    number: 261,
    issueDate: new Date(15/0o5/2024),
    userName: 'María López',
    subtotal: 150,
    tax: 10,
    total: 660,
    discount: 30,
    paymentMethod: 'Efectivo',
    status: false,
  },
  {
    id: 3,
    number: 262,
    issueDate: new Date(20/0o7/2024), 
    userName: 'Juan Pérez',
    subtotal: 200,
    tax: 12,
    total: 850,
    discount: 50,
    paymentMethod: 'Transferencia bancaria',
    status: true,
  }
];

@Component({
  selector: 'app-invoice-index',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIcon,
    MatPaginatorModule,
    MatTableModule,
    RouterLink,
  ],
  templateUrl: './invoice-index.component.html',
  styleUrl: './invoice-index.component.css',
})
export class InvoiceIndexComponent {
  displayedColumns: string[] = [
    'id',
    'number',
    'issueDate',
    'userName',
    'subtotal',
    'tax',
    'total',
    'discount',
    'paymentMethod',
    'status',
    'actions',
  ];

  headerTitles: { [key: string]: string } = {
    id: 'ID',
    number: 'Número',
    issueDate: 'Fecha de emisión',
    userName: 'Nombre de Vendedor',
    providerName: 'Nombre de proovedor',
    subtotal: 'Subtotal',
    tax: 'Impuesto',
    total: 'Total',
    discount:'Descuento',
    paymentMethod: 'Método de Pago',
    status: 'Estado',
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
