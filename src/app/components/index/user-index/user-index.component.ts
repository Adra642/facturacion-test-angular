import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  dataSource = new MatTableDataSource<any>([]);
  allUsers: any[] = [];
  totalItems = 0;
  pageSize = 5;
  currentPage = 0;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.allUsers = data;
      this.totalItems = data.length;
      this.updateDataSource();
    });
  }

  updateDataSource(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.allUsers.slice(startIndex, endIndex);
  }

  pageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updateDataSource();
  }

  delete(id: number) {
    this.userService.deleteUser(id, { responseType: 'text' }).subscribe({
      next: (response) => {
        this.allUsers = this.allUsers.filter((item) => item.id !== id);
        this.totalItems = this.allUsers.length;
        this.updateDataSource();
      },
      error: (error) => {
        console.error('Error deleting category:', error);
        this.snackBar.open(
          'No se puede eliminar el usuario debido a que esta relacionado a otra entidad',
          'Cerrar',
          { duration: 5000 }
        );
      },
      complete: () => {
        this.snackBar.open('El usuario fue eliminado correctamente', 'Cerrar', {
          duration: 5000,
        });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
