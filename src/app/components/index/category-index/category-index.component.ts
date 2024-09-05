import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
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

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  delete(id: number) {
    this.categoryService
      .deleteCategory(id, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter(
            (item) => item.id !== id
          );
        },
        error: (error) => {
          console.error('Error deleting category:', error);
          this.snackBar.open(
            'No se puede eliminar el registro debido a que pertenece a otra entidad',
            'Cerrar',
            { duration: 5000 }
          );
        },
        complete: () => {
          this.snackBar.open(
            'El elemento fue eliminado correctamente',
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
