import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';
  mensaje = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  iniciarSesion(): void {

    const correcto = this.authService.login(
      this.email,
      this.password
    );

    if (correcto) {

      this.mensaje = '';

      this.router.navigate(['/inicio']);

    } else {

      this.mensaje =
        'Correo o contraseña incorrectos.';
    }
  }
}