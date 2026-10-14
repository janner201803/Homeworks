
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';
  cargando = false;

  async iniciarSesion(): Promise<void> {
    this.error = '';

    if (!this.email.trim() || !this.password) {
      this.error = 'Completa todos los campos.';
      return;
    }

    this.cargando = true;

    try {
      await this.authService.iniciarSesion(
        this.email.trim(),
        this.password
      );

      await this.router.navigate(['/archivos']);
    } catch (error: any) {
      this.error = this.mensajeError(error.code);
    } finally {
      this.cargando = false;
    }
  }

  private mensajeError(code: string): string {
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'El correo o la contraseña son incorrectos.';

      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';

      case 'auth/too-many-requests':
        return 'Demasiados intentos. Inténtalo más tarde.';

      default:
        return 'No fue posible iniciar sesión.';
    }
  }
}
