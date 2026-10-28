import { Injectable } from '@angular/core';
import { RealtimeChannel } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

export interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
  user_id: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private supabase;

  constructor(supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async listarTareas() {
    return await this.supabase
      .from('tareas')
      .select('id, titulo, completada, user_id, created_at')
      .order('created_at', { ascending: false });
  }

  async crearTarea(titulo: string, usuarioId: string) {
    if (!usuarioId) {
      throw new Error('La sesión expiró. Inicia sesión de nuevo.');
    }

    return await this.supabase
      .from('tareas')
      // El JWT autentica la petición; RLS valida que user_id coincida con auth.uid().
      // Usamos el id de la sesión ya cargada para evitar otra llamada de Auth.
      .insert({ titulo, user_id: usuarioId })
      .select()
      .single();
  }

  leerCache(usuarioId: string): Tarea[] {
    try {
      const valor = sessionStorage.getItem(this.claveCache(usuarioId));
      if (!valor) return [];

      const tareas = JSON.parse(valor) as Tarea[];
      if (!Array.isArray(tareas)) return [];

      return tareas.filter((tarea) =>
        tarea.user_id === usuarioId &&
        typeof tarea.id === 'number' &&
        typeof tarea.titulo === 'string' &&
        typeof tarea.completada === 'boolean'
      );
    } catch {
      return [];
    }
  }

  guardarCache(usuarioId: string, tareas: Tarea[]): void {
    try {
      sessionStorage.setItem(this.claveCache(usuarioId), JSON.stringify(tareas));
    } catch {
      // La app sigue funcionando si el navegador bloquea el almacenamiento local.
    }
  }

  limpiarCache(usuarioId: string): void {
    try {
      sessionStorage.removeItem(this.claveCache(usuarioId));
    } catch {
      // El almacenamiento local es solo una optimización.
    }
  }

  private claveCache(usuarioId: string): string {
    return `supabase-tareas:${usuarioId}`;
  }

  async actualizarTarea(
    id: number,
    titulo: string,
    completada: boolean
  ) {
    return await this.supabase
      .from('tareas')
      .update({ titulo, completada })
      .eq('id', id)
      .select()
      .single();
  }

  async eliminarTarea(id: number) {
    return await this.supabase
      .from('tareas')
      .delete()
      .eq('id', id);
  }

  escucharCambios(
    callback: () => void,
    alCambiarEstado?: (estado: string, error?: Error | null) => void
  ): RealtimeChannel {
    return this.supabase
      .channel('cambios-tareas')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tareas'
        },
        () => callback()
      )
      .subscribe((estado, error) => alCambiarEstado?.(estado, error));
  }

  async dejarDeEscuchar(
    channel: RealtimeChannel
  ) {
    await this.supabase.removeChannel(channel);
  }
}
