import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { InicioComponent } from './inicio/inicio';
import { ArbolComponent } from './arbol/arbol';
import { ArbolBinario } from './arbol-binario/arbol-binario';

import { authGuard } from './auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [authGuard]
  },

  {
    path: 'arbol-nario',
    component: ArbolComponent,
    canActivate: [authGuard]
  },

  {
    path: 'arbol-binario',
    component: ArbolBinario,
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