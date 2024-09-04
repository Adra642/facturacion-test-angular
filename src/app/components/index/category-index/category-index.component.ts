import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Category } from '../../../interfaces/category';

const ELEMENT_DATA: Category[] = [
  {
    id: 1,
    name: 'Servicios',
  },
  {
    id: 2,
    name: 'Combustible',
  },
  {
    id: 3,
    name: 'Gastos de oficina',
  },
];
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
export class CategoryIndexComponent {
  displayedColumns: string[] = ['id', 'name', 'actions'];

  headerTitles: { [key: string]: string } = {
    id: 'Id',
    name: 'Nombre',
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
