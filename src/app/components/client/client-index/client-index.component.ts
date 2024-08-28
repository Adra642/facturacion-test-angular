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
    name: 'Juan',
    surname: 'Pérez',
    email: 'juan.perez@example.com',
    telefono: 123-456-7890, 
    direccion: '123 Calle Principal',
    RFC: 'JUPR800101HDF', 
    creationDate: new Date('2022-01-01'),
    state: true,
  },
  {
    id: 2,
    name: 'María',
    surname: 'Gómez',
    email: 'maria.gomez@example.com',
    telefono: 234-567-8901, 
    direccion: '456 Avenida Secundaria', 
    RFC: 'MAGO820202MDF', 
    creationDate: new Date('2022-02-01'),
    state: true,
  },
  {
    id: 3,
    name: 'Pedro',
    surname: 'Rodríguez',
    email: 'pedro.rodriguez@example.com',
    telefono: 345-678-9012, 
    direccion: '789 Boulevard Tercero', 
    RFC: 'PERO830303LDF', 
    creationDate: new Date('2022-03-01'),
    state: false,
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
  templateUrl: './client-index.component.html',
  styleUrl: './client-index.component.css',
})
export class ClientIndexComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'email',
    'telefono',
    'direccion',
    'RFC',
    'creationDate',
    'state',
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
