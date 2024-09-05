import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupplierService } from '../../../services/supplier.service';

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
  supplierId: string = '';
  supplier: any;

  constructor(
    private route: ActivatedRoute,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.supplierId = id;
      this.loadSupplier();
    } else {
      // Manejar el caso donde el ID no está presente en la URL
      console.error('No ID found in the URL');
    }
  }

  loadSupplier(): void {
    //TODO
  }
  rucFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{11}$'),
  ]);
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),
  ]);
  telephoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{9}$'),
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  addressFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),
  ]);
}
