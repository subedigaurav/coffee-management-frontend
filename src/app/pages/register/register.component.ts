import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgOptimizedImage } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AuthService } from '@services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
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

  constructor(private authService: AuthService) {}

  onFormSubmit() {
    this.authService
      .register({
        email: this.registerForm.value.email!,
        username: this.registerForm.value.username!,
        password: this.registerForm.value.password!,
        first_name: this.registerForm.value.firstName!,
        last_name: this.registerForm.value.lastName!,
      })
      .subscribe();
  }
}
