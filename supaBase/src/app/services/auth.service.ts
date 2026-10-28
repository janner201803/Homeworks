import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase;

  constructor(supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async registrar(correo: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email: correo,
      password: password
    });

    if (error) {
      console.error('Error al registrar usuario:', error.message);
      throw error;
    }

    return data;
  }

  async iniciarSesion(correo: string, contraseña: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: correo,
      password: contraseña
    });

    if (error) {
      console.error('Error al iniciar sesión:', error.message);
      throw error;
    }

    return data;
  }

  async cerrarSesion() {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      console.error('Error al cerrar sesión:', error.message);
      throw error;
    }
  }

  async obtenerUsuario() {
    const { data, error } = await this.supabase.auth.getUser();

    if (error) {
      return null;
    }

    return data.user;
  }

  async obtenerSesion() {
    const { data, error } = await this.supabase.auth.getSession();

    if (error) {
      return null;
    }

    return data.session;
  }
}
