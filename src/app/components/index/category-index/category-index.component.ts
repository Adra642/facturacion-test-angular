import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-index',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIcon,
    MatPaginatorModule,
    MatTableModule,
    RouterLink,
  ],
  templateUrl: './category-index.component.html',
  styleUrl: './category-index.component.css',
})
export class CategoryIndexComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];

  headerTitles: { [key: string]: string } = {
    id: 'Id',
    name: 'Nombre',
    actions: 'Acciones',
  };

  dataSource = new MatTableDataSource<any>([]);
  allCategories: any[] = [];
  totalItems = 0;
  pageSize = 5;
  currentPage = 0;

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
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
    this.categoryService
      .deleteCategory(id, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.allCategories = this.allCategories.filter(
            (item) => item.id !== id
          );
          this.totalItems = this.allCategories.length;
          this.updateDataSource();
        },
        error: (error) => {
          console.error('Error deleting category:', error);
          this.snackBar.open(
            'No se puede eliminar la categoría debido a que esta relacionado a otra entidad',
            'Cerrar',
            { duration: 5000 }
          );
        },
        complete: () => {
          this.snackBar.open(
            'La categoría fue eliminado correctamente',
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
