import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Role } from '../../../interfaces/role';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { firstValueFrom } from 'rxjs';
import { SupplierService } from '../../../services/supplier.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-product-add',
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
})
export class ProductAddComponent {
  suppliers: any[] = [];
  categories: any[] = [];

  productForm = new FormGroup({
    code: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9]{5}$'),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
    ]),
    stock: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]),
    supplier: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
    ]),
    category: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit() {
    this.supplierService.getAllSuppliers().subscribe((data) => {
      this.suppliers = data;
    });
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  async addProduct() {
    if (this.productForm.valid) {
      const newProduct: Product = {
        code: this.productForm.value.code!,
        name: this.productForm.value.name!,
        description: this.productForm.value.description!,
        price: parseFloat(this.productForm.value.price!),
        stock: parseInt(this.productForm.value.stock!),
        category: {
          id: this.productForm.value.category!,
        },
        supplier: {
          id: this.productForm.value.supplier!,
        },
      };

      try {
        await firstValueFrom(this.productService.addProduct(newProduct));
        console.log('Product added');
        this.router.navigate(['/product/index']);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  }
}
