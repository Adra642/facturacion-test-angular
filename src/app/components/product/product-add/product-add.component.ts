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
  selector: 'app-user-add',
  standalone: true,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
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
export class ProductAddComponent {
  idFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+$'),
  ]);
  codeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9]+$'),
  ]);
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),
  ]);
  descriptionFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(255),
  ]);
  priceFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
  ]);
  stockFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+$'),
  ]);
  categoryFormControl = new FormControl<Role | null>(null, Validators.required);
  supplierFormControl = new FormControl<Role | null>(null, Validators.required);

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  roles: Role[] = [{ name: 'Administrador' }, { name: 'Vendedor' }];
}
