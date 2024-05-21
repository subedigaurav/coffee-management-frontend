import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isLoggedIn$ = this.authService.loggedIn$;

  constructor(private authService: AuthService) {}
}
