import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AuthService } from '@services/auth/auth.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    NgOptimizedImage,
    PasswordModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterLink,
    KeyFilterModule,
  ],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public registerForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onFormSubmit() {
    this.authService
      .register({
        email: this.registerForm.value.email!,
        username: this.registerForm.value.username!,
        password: this.registerForm.value.password!,
        first_name: this.registerForm.value.firstName!,
        last_name: this.registerForm.value.lastName!,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 400) {
            const { errors } = err.error;
            if (errors['username']) {
              this.registerForm.controls.username.setErrors({
                duplicate: true,
              });
            } else if (errors['email']) {
              this.registerForm.controls.email.setErrors({
                duplicate: true,
              });
            }
          }
          return EMPTY;
        })
      )
      .subscribe(res => {
        this.router.navigateByUrl('login');
      });
  }
}
