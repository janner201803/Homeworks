
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async register() {
    this.error = '';
    this.loading = true;

    try {
      await this.authService.register(this.email, this.password);
      await this.router.navigate(['/inicio']);
    } catch {
      this.error = 'No se pudo crear la cuenta. Revisa el correo y la contraseña.';
    } finally {
      this.loading = false;
    }
  }
}
