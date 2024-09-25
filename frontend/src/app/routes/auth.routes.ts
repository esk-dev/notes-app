import { Route } from '@angular/router';

export const AuthRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('@app/auth/login/login.component').then((c) => c.LoginComponent),
    title: 'Авторизация',
  },
  {
    path: 'register',
    loadComponent: () => import('@app/auth/register/register.component').then((c) => c.RegisterComponent),
    title: 'Регистрация',
  },
];
