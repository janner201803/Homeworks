import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario = signal<string | null>(null);

  constructor() {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      this.usuario.set(usuarioGuardado);
    }
  }

  login(email: string, password: string): boolean {
    if (
      email === 'user@mail.com' &&
      password === '123'
    ) {
      this.usuario.set(email);
      localStorage.setItem(
        'usuario',
        email
      );
      return true;
    }
    return false;
  }

  logout(): void {
    this.usuario.set(null);
    localStorage.removeItem('usuario');
  }
  estaAutenticado(): boolean {
    return this.usuario() !== null;
  }
}