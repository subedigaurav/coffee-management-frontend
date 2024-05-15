import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth/auth-guard.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { TablesComponent } from './pages/tables/tables.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'tables',
    component: TablesComponent,
  },
  {
    path: 'table/:id',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];
