import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SupplierService } from '../../../services/supplier.service';

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

  dataSource = new MatTableDataSource<any>([]);
  allCategories: any[] = [];
  totalItems = 0;
  pageSize = 5;
  currentPage = 0;

  constructor(
    private supplierService: SupplierService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.supplierService.getAllSuppliers().subscribe((data) => {
      this.allCategories = data;
      this.totalItems = data.length;
      this.updateDataSource();
    });
  }

  updateDataSource(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.allCategories.slice(startIndex, endIndex);
  }

  pageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updateDataSource();
  }

  delete(id: number) {
    this.supplierService
      .deleteSupplier(id, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.allCategories = this.allCategories.filter(
            (item) => item.id !== id
          );
          this.totalItems = this.allCategories.length;
          this.updateDataSource();
        },
        error: (error) => {
          console.error('Error deleting category:', error);
          this.snackBar.open(
            'No se puede eliminar el proveedor debido a que esta relacionado a otra entidad',
            'Cerrar',
            { duration: 5000 }
          );
        },
        complete: () => {
          this.snackBar.open(
            'El proveedor fue eliminado correctamente',
            'Cerrar',
            { duration: 5000 }
          );
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
