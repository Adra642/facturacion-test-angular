import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from '../../../interfaces/supplier';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-supplier-add',
  standalone: true,
  templateUrl: './supplier-add.component.html',
  styleUrl: './supplier-add.component.css',
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class SupplierAddComponent {
  supplierForm = new FormGroup({
    ruc: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{11}$'),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9 #%&*(),.":]+$'),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{9}$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9 ,.-/#]+$'),
    ]),
  });

  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) {}

  async addSupplier() {
    if (this.supplierForm.valid) {
      const newSupplier: Supplier = {
        ruc: this.supplierForm.value.ruc!,
        name: this.supplierForm.value.name!,
        email: this.supplierForm.value.email!,
        address: this.supplierForm.value.address!,
        phone: this.supplierForm.value.phone!,
      };

      try {
        await firstValueFrom(this.supplierService.addSupplier(newSupplier));
        console.log('Supplier added');
        this.router.navigate(['/supplier/index']);
      } catch (error) {
        console.error('Error adding supplier:', error);
      }
    }
  }
}
