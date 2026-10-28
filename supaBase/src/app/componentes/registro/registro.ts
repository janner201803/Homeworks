import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  correo = '';
  password = '';
  mensaje = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async registrar() {
    this.mensaje = '';
    this.cargando = true;

    try {
      const data = await this.authService.registrar(
        this.correo,
        this.password
      );

      if (data.session) {
        await this.router.navigate(['/tareas']);
      } else {
        this.mensaje =
          'Registro realizado. Revisa tu correo para confirmar la cuenta.';
      }
    } catch (error) {
      this.mensaje = error instanceof Error
        ? error.message
        : 'Ocurrió un error al registrar el usuario.';
    } finally {
      this.cargando = false;
    }
  }
}
