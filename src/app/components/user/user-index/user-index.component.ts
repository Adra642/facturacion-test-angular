import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { User } from '../../../interfaces/user';

const ELEMENT_DATA: User[] = [
  {
    id: 1,
    name: 'Juan',
    surname: 'Pérez',
    email: 'juan.perez@example.com',
    password: '123456',
    role: 'admin',
    creationDate: new Date('2022-01-01'),
    state: true,
  },
  {
    id: 2,
    name: 'María',
    surname: 'Gómez',
    email: 'maria.gomez@example.com',
    password: 'abcdef',
    role: 'vendedor',
    creationDate: new Date('2022-02-01'),
    state: true,
  },
  {
    id: 3,
    name: 'Pedro',
    surname: 'Rodríguez',
    email: 'pedro.rodriguez@example.com',
    password: '987654',
    role: 'admin',
    creationDate: new Date('2022-03-01'),
    state: false,
  },
];
@Component({
  selector: 'app-user-index',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIcon,
    MatPaginatorModule,
    MatTableModule,
    RouterLink,
  ],
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.css',
})
export class UserIndexComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'email',
    'password',
    'role',
    'creationDate',
    'state',
    'actions',
  ];

  headerTitles: { [key: string]: string } = {
    id: 'Id',
    name: 'Nombre',
    surname: 'Apellido',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    role: 'Rol',
    creationDate: 'Fecha de Creación',
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
