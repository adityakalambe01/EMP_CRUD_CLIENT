import { Routes } from '@angular/router';
import { LoginComponent } from './admin/auth/login/login.component';
import { RegisterComponent } from './admin/auth/register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { employeeRoutes } from './admin/dashboard/employee.routes';
import { loginGuard } from './core/guards/login/login.guard';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [...employeeRoutes],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
