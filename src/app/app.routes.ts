import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.Login)
  },
  {
    path: '',
    loadComponent: () => import('./shell/shell').then(m => m.Shell),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
