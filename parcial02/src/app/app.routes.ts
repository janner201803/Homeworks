
import { Routes } from '@angular/router';

import { Login } from '../app/login/login';
import { Registro } from '../app/registro/registro';
import { GestorArchivos } from '../app/gestor-archivos/gestor-archivos';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'registro',
    component: Registro
  },
  {
    path: 'archivos',
    component: GestorArchivos,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
