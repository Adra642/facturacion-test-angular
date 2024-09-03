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
import { InvoiceService } from '../../../services/invoice.service';

@Component({
  selector: 'app-invoice-edit',
  standalone: true,
  templateUrl: './invoice-edit.component.html',
  styleUrl: './invoice-edit.component.css',
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
export class InvoiceEditComponent {
  invoiceId: string = '';
  invoice: any;

  constructor(
    private route: ActivatedRoute,
    private InvoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.invoiceId = id;
      this.loadInvoice();
    } else {
      // Manejar el caso donde el ID no está presente en la URL
      console.error('No ID found in the URL');
    }
  }

  loadInvoice(): void {
    //TODO
  }
  idFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+$'), 
  ]);
  
  invoiceNumberFormControl = new FormControl('', [
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
