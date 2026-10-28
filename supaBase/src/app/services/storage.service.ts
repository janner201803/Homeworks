import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private supabase;

  constructor(supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async subirAvatar(archivo: File) {
    const { data: usuarioData, error: usuarioError } =
      await this.supabase.auth.getUser();

    if (usuarioError || !usuarioData.user) {
      throw new Error('Debes iniciar sesión.');
    }

    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!tiposPermitidos.includes(archivo.type)) {
      throw new Error('Selecciona una imagen JPG, PNG, WEBP o GIF.');
    }

    if (archivo.size > 2 * 1024 * 1024) {
      throw new Error('La imagen debe pesar máximo 2 MB.');
    }

    const usuarioId = usuarioData.user.id;
    const extension = archivo.name.split('.').pop() || 'jpg';
    const ruta = `${usuarioId}/${Date.now()}.${extension}`;

    const { data, error } = await this.supabase.storage
      .from('avatars')
      .upload(ruta, archivo, {
        upsert: false
      });

    if (error) {
      throw error;
    }

    const { error: perfilError } = await this.supabase.auth.updateUser({
      data: { avatar_path: data.path }
    });

    if (perfilError) {
      throw perfilError;
    }

    return data.path;
  }

  async obtenerAvatarUsuario() {
    // La sesión ya está en el cliente; leerla localmente evita bloquear la carga inicial.
    const { data, error } = await this.supabase.auth.getSession();

    if (error || !data.session?.user) {
      return null;
    }

    const ruta = data.session.user.user_metadata?.['avatar_path'];
    return typeof ruta === 'string' && ruta ? ruta : null;
  }

  async obtenerUrlAvatar(ruta: string) {
    const { data, error } = await this.supabase.storage
      .from('avatars')
      .createSignedUrl(ruta, 3600);

    if (error) {
      throw error;
    }

    return data.signedUrl;
  }
}
