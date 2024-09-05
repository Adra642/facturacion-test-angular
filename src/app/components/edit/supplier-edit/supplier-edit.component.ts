import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupplierService } from '../../../services/supplier.service';
import { Router } from '@angular/router';
import { Supplier } from '../../../interfaces/supplier';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-supplier-edit',
  standalone: true,
  templateUrl: './supplier-edit.component.html',
  styleUrl: './supplier-edit.component.css',
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
export class SupplierEditComponent {
  supplierId: number;
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
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private supplierService: SupplierService
  ) {
    this.supplierId = Number(this.route.snapshot.paramMap.get('id'));
    this.supplierForm = this.fb.group({
      ruc: [''],
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
    });
  }

  ngOnInit(): void {
    if (this.supplierId) {
      this.getSupplier(this.supplierId);
    } else {
      console.error('No ID found in the URL');
    }
  }

  getSupplier(id: number) {
    this.supplierService.getSupplier(id).subscribe({
      next: (supplier: any) => {
        this.supplierForm.patchValue({
          ruc: supplier.ruc,
          name: supplier.name,
          email: supplier.email,
          phone: supplier.phone,
          address: supplier.address,
        });
      },
      error: (error) => {
        console.error('Error loading category:', error);
      },
    });
  }

  async editSupplier() {
    if (this.supplierForm.valid) {
      const supplier: Supplier = {
        id: this.supplierId,
        ruc: this.supplierForm.value.ruc!,
        name: this.supplierForm.value.name!,
        email: this.supplierForm.value.email!,
        phone: this.supplierForm.value.phone!,
        address: this.supplierForm.value.address!,
      };
      try {
        await firstValueFrom(this.supplierService.addSupplier(supplier));
        console.log('Supplier edited');
        this.router.navigate(['/supplier/index']);
      } catch (error) {
        console.error('Error editing supplier:', error);
      }
    }
  }
}
