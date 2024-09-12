import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../../interfaces/role';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../../interfaces/user';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent {
  userId: number;
  userForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      surname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.min(5),
          Validators.pattern(
            '^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};\'":\\\\|,.<>\\/?]*$'
          ),
        ],
      ],
      state: [true, Validators.required],
      role: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.getUser(this.userId);
    } else {
      console.error('No ID found in the URL');
    }
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe({
      next: (user: any) => {
        this.userForm.patchValue({
          name: user.name,
          surname: user.name,
          email: user.email,
          password: user.password,
          state: user.state,
          role: user.role.id,
        });
      },
      error: (error) => {
        console.error('Error loading category:', error);
      },
    });
  }

  async editUser() {
    if (this.userForm.valid) {
      const user: User = {
        id: this.userId,
        name: this.userForm.value.name!,
        surname: this.userForm.value.surname!,
        email: this.userForm.value.email!,
        password: this.userForm.value.password!,
        state: this.userForm.value.state!,
        role: {
          id: this.userForm.value.role!,
        },
      };

      try {
        await firstValueFrom(this.userService.editUser(user));
        console.log('User edited');
        this.router.navigate(['/user/index']);
      } catch (error) {
        console.error('Error editing user:', error);
      }
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  roles: Role[] = [
    { id: 1, name: 'ADMINISTRADOR' },
    { id: 2, name: 'VENDEDOR' },
  ];
}
