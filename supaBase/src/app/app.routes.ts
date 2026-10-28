
import { Routes } from '@angular/router';
import { Login } from '../app/componentes/login/login';
import { Registro } from '../app/componentes/registro/registro';
import { Tareas } from '../app/componentes/tareas/tareas';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'registro',
    component: Registro
  },
  {
    path: 'tareas',
    component: Tareas,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
