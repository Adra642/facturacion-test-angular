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
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  selector: 'app-category-add',
  standalone: true,
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css',
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class CategoryAddComponent {
  categoryForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
  });

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  async addCategory() {
    if (this.categoryForm.valid) {
      const newCategory: Category = {
        name: this.categoryForm.value.name!,
      };

      try {
        await firstValueFrom(this.categoryService.addCategory(newCategory));
        console.log('Category added');
        this.router.navigate(['/category/index']);
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  }
}
