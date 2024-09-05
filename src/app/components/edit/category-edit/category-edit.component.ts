import { Component, OnInit } from '@angular/core';
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
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Category } from '../../../interfaces/category';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css',
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class CategoryEditComponent implements OnInit {
  categoryId: number;
  categoryForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryForm = this.fb.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    if (this.categoryId) {
      this.getCategory(this.categoryId);
    } else {
      console.error('No ID found in the URL');
    }
  }

  getCategory(id: number) {
    this.categoryService.getCategory(id).subscribe({
      next: (category: any) => {
        this.categoryForm.patchValue({
          name: category.name,
        });
      },
      error: (error) => {
        console.error('Error loading category:', error);
      },
    });
  }

  async editCategory() {
    if (this.categoryForm.valid) {
      const category: Category = {
        id: this.categoryId,
        name: this.categoryForm.value.name!,
      };
      try {
        await firstValueFrom(this.categoryService.addCategory(category));
        console.log('Category edited');
        this.router.navigate(['/category/index']);
      } catch (error) {
        console.error('Error editing category:', error);
      }
    }
  }
}
