import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { NgOptimizedImage } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    RouterLink,
    InputTextModule,
    HttpClientModule,
    PasswordModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  public loginForm = new FormGroup({
    identifier: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  onFormSubmit() {
    if (this.loginForm.invalid) return;

    this.authService
      .login({
        username: this.loginForm.value.identifier!,
        password: this.loginForm.value.password!,
      })
      .subscribe(res => {
        this.router.navigate(['tables']).then();
      });
  }
}
