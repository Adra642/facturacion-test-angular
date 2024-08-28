import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

import { Role } from '../../../interfaces/role';

@Component({
  selector: 'app-client-add',
  standalone: true,
  templateUrl: './client-add.component.html',
  styleUrl: './client-add.component.css',
  imports: [
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientAddComponent {
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),
  ]);
  surnameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  telefonoFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9-]+$') 
  ]);
  direccionFormControl = new FormControl('', [
    Validators.required
  ]);
  rfcFormControl = new FormControl('', [
    Validators.required
  ]);
}
