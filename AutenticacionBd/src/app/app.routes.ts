import { Routes, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../app/auth';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { InicioComponent } from './inicio/inicio';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const authenticated = await this.authService.isAuthenticated();

    if (authenticated) {
      return true;
    }

    await this.router.navigate(['/login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const authenticated = await this.authService.isAuthenticated();

    if (authenticated) {
      await this.router.navigate(['/inicio']);
      return false;
    }

    return true;
  }
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
