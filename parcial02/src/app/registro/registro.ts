import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class Registro {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  confirmarPassword = '';
  error = '';
  cargando = false;

  async registrar(): Promise<void> {
    this.error = '';

    if (
      !this.email.trim() ||
      !this.password ||
      !this.confirmarPassword
    ) {
      this.error = 'Completa todos los campos.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (this.password !== this.confirmarPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    this.cargando = true;

    try {
      await this.authService.registrar(
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
      case 'auth/email-already-in-use':
        return 'Este correo ya está registrado.';

      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';

      case 'auth/weak-password':
        return 'La contraseña es demasiado débil.';

      default:
        return 'No fue posible crear la cuenta.';
    }
  }
}
