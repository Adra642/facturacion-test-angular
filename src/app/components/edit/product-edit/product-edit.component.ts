import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { SupplierService } from '../../../services/supplier.service';
import { ProductService } from '../../../services/product.service';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../../interfaces/product';
@Component({
  selector: 'app-product-edit',
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
    RouterLink,
  ],
})
export class ProductEditComponent {
  productId: number;
  suppliers: any[] = [];
  categories: any[] = [];

  productForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService
  ) {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{5}$')]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      price: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      ],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      supplier: [0, [Validators.required, Validators.min(1)]],
      category: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.supplierService.getAllSuppliers().subscribe((data) => {
      this.suppliers = data;
    });
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
    if (this.productId) {
      this.getProduct(this.productId);
    } else {
      console.error('No ID found in the URL');
    }
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (product: any) => {
        this.productForm.patchValue({
          code: product.code,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          supplier: product.supplier.id,
          category: product.category.id,
        });
      },
      error: (error) => {
        console.error('Error loading category:', error);
      },
    });
  }

  async editProduct() {
    if (this.productForm.valid) {
      const product: Product = {
        id: this.productId,
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
        await firstValueFrom(this.productService.editProduct(product));
        console.log('Product edited');
        this.router.navigate(['/product/index']);
      } catch (error) {
        console.error('Error editing product:', error);
      }
    }
  }
}
