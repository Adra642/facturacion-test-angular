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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-add',
  standalone: true,
  templateUrl: './invoice-add.component.html',
  styleUrl: './invoice-add.component.css',
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
export class InvoiceAddComponent { 
  numberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+$'), 
  ]);
  
  issueDateFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'), 
  ]);
  
  userNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'), 
  ]);
  
  subtotalFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'), 
  ]);
  
  taxFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'),
  ]);
  
  totalFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'), 
  ]);
  
  discountFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'), 
  ]);
  
  paymentMethodFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'), 
  ]);
  
  statusFormControl = new FormControl('', [
    Validators.required,
  ]);
}
