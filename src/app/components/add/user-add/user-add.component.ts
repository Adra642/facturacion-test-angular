import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
import { firstValueFrom } from 'rxjs';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../interfaces/role';

@Component({
  selector: 'app-user-add',
  standalone: true,
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css',
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
export class UserAddComponent {
  userForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.min(5),
      Validators.pattern(
        '^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};\'":\\\\|,.<>\\/?]*$'
      ),
    ]),
    state: new FormControl<boolean>(true, Validators.required),
    role: new FormControl<number>(0, Validators.required),
  });

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private userService: UserService, private router: Router) {}

  async addUser() {
    if (this.userForm.valid) {
      const newUser: User = {
        name: this.userForm.value.name!,
        surname: this.userForm.value.name!,
        email: this.userForm.value.email!,
        password: this.userForm.value.password!,
        role: {
          id: this.userForm.value.role!,
        },
        state: this.userForm.value.state!,
      };

      console.log(newUser);
      try {
        await firstValueFrom(this.userService.addUser(newUser));
        console.log('User added');
        this.router.navigate(['/user/index']);
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  }

  roles: Role[] = [
    { id: 1, name: 'ADMINISTRADOR' },
    { id: 2, name: 'VENDEDOR' },
  ];
}
