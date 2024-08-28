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

import { Role } from '../../../interfaces/role';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
  imports: [
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent {
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
  categoryFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),  
  ]);
  supplierFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),  
  ]);

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  roleControl = new FormControl<Role | null>(null, Validators.required);
  roles: Role[] = [{ name: 'Administrador' }, { name: 'Vendedor' }];
}
