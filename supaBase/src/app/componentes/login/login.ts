import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  correo = '';
  password = '';
  mensaje = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async iniciarSesion() {
    this.mensaje = '';
    this.cargando = true;

    try {
      await this.authService.iniciarSesion(
        this.correo,
        this.password
      );

      await this.router.navigate(['/tareas']);
    } catch (error) {
      this.mensaje = error instanceof Error
        ? error.message
        : 'No fue posible iniciar sesión.';
    } finally {
      this.cargando = false;
    }
  }
}
