import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';

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
    actions: 'Acciones',
  };
  dataSource = new MatTableDataSource<any>([]);
  allProducts: any[] = [];
  totalItems = 0;
  pageSize = 5;
  currentPage = 0;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.allProducts = data;
      this.totalItems = data.length;
      this.updateDataSource();
    });
  }

  updateDataSource(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.allProducts.slice(startIndex, endIndex);
  }

  pageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updateDataSource();
  }

  delete(id: number) {
    this.productService.deleteProduct(id, { responseType: 'text' }).subscribe({
      next: (response) => {
        this.allProducts = this.allProducts.filter((item) => item.id !== id);
        this.totalItems = this.allProducts.length;
        this.updateDataSource();
      },
      error: (error) => {
        console.error('Error deleting product:', error);
        this.snackBar.open(
          'No se puede eliminar el producto debido a que esta relacionado a otra entidad',
          'Cerrar',
          { duration: 5000 }
        );
      },
      complete: () => {
        this.snackBar.open(
          'El producto fue eliminado correctamente',
          'Cerrar',
          {
            duration: 5000,
          }
        );
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
