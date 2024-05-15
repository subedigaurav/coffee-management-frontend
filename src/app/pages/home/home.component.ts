import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
