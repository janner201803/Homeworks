import {ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RealtimeChannel } from '@supabase/supabase-js';
import { AuthService } from '../../services/auth.service';
import {Tarea,TareasService} from '../../services/tareas.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css'
})
export class Tareas implements OnInit, OnDestroy {
  avatarUrl = '';
  rutaAvatar = '';
  mensajeAvatar = '';

  tareas: Tarea[] = [];
  titulo = '';
  mensaje = '';
  cargando = false;
  cargandoLista = true;
  estadoRealtime = 'Conectando en tiempo real…';
  private usuarioId = '';
  private canal?: RealtimeChannel;

  constructor(
    private tareasService: TareasService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const sesion = await this.authService.obtenerSesion();
    this.usuarioId = sesion?.user.id ?? '';

    if (this.usuarioId) {
      this.tareas = this.tareasService.leerCache(this.usuarioId);
      this.cargandoLista = this.tareas.length === 0;
      this.changeDetector.markForCheck();
    }

    this.canal = this.tareasService.escucharCambios(
      async () => {
        await this.cargarTareas(true);
      },
      (estado, error) => {
        if (estado === 'SUBSCRIBED') {
          this.estadoRealtime = 'Sincronización en tiempo real activa';
        } else if (estado === 'CHANNEL_ERROR' || estado === 'TIMED_OUT') {
          this.estadoRealtime = 'Sin conexión en tiempo real. Puedes actualizar la lista.';
          if (error) {
            console.error('Error de Realtime:', error.message);
          }
        } else if (estado === 'CLOSED') {
          this.estadoRealtime = 'Sin conexión en tiempo real. Puedes actualizar la lista.';
        }
        // Los callbacks de Supabase Realtime pueden ejecutarse fuera del ciclo de Angular.
        this.changeDetector.markForCheck();
      }
    );

    // La carga del avatar usa Storage/Auth y no debe bloquear la consulta de tareas.
    void this.cargarAvatar();
    // Muestra el último listado local al instante y sincroniza con la BD en segundo plano.
    void this.cargarTareas(this.tareas.length > 0);
  }

  async cargarAvatar() {
    try {
      this.rutaAvatar = await this.storageService.obtenerAvatarUsuario() ?? '';
      if (this.rutaAvatar) {
        this.avatarUrl = await this.storageService.obtenerUrlAvatar(this.rutaAvatar);
      }
    } catch {
      this.mensajeAvatar = 'No fue posible cargar tu foto de perfil.';
    } finally {
      this.changeDetector.markForCheck();
    }
  }
  
  async subirAvatar(event: Event) {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) {
      return;
    }

    try {
      this.rutaAvatar = await this.storageService.subirAvatar(archivo);
      this.avatarUrl =
        await this.storageService.obtenerUrlAvatar(this.rutaAvatar);

      this.mensajeAvatar = 'Imagen subida correctamente.';
    } catch (error) {
      this.mensajeAvatar =
        error instanceof Error ? error.message : 'Error al subir la imagen.';
    } finally {
      input.value = '';
      this.changeDetector.markForCheck();
    }
  }

  async cargarTareas(enSegundoPlano = false): Promise<boolean> {
    if (!enSegundoPlano) {
      this.cargandoLista = true;
      this.mensaje = '';
    }

    try {
      const { data, error } = await this.tareasService.listarTareas();

      if (error) {
        this.mensaje = `No se pudieron sincronizar las tareas: ${error.message}. Revisa que exista public.tareas y que sus políticas RLS permitan el acceso.`;
        this.changeDetector.markForCheck();
        return false;
      }

      this.tareas = (data ?? []) as Tarea[];
      if (this.usuarioId) {
        this.tareasService.guardarCache(this.usuarioId, this.tareas);
      }
      this.mensaje = '';
      this.changeDetector.markForCheck();
      return true;
    } catch (error) {
      const detalle = error instanceof Error ? error.message : 'Error de conexión con Supabase.';
      this.mensaje = `No se pudo conectar con la base de datos: ${detalle}`;
      this.changeDetector.markForCheck();
      return false;
    } finally {
      if (!enSegundoPlano) {
        this.cargandoLista = false;
      }
      this.changeDetector.markForCheck();
    }
  }

  async agregarTarea() {
    const tituloLimpio = this.titulo.trim();

    if (!tituloLimpio) {
      this.mensaje = 'Escribe el nombre de la tarea.';
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    const fecha = new Date().toISOString();
    const tareaTemporal: Tarea = {
      id: -Date.now(),
      titulo: tituloLimpio,
      completada: false,
      user_id: this.usuarioId,
      created_at: fecha
    };
    const tareasAnteriores = this.tareas;
    this.tareas = [tareaTemporal, ...this.tareas];
    this.titulo = '';
    this.guardarCacheLocal();
    this.changeDetector.markForCheck();

    try {
      const { data, error } = await this.tareasService.crearTarea(tituloLimpio, this.usuarioId);

      if (error) {
        this.tareas = tareasAnteriores;
        this.guardarCacheLocal();
        this.titulo = tituloLimpio;
        this.mensaje = error.message;
        return;
      }

      if (data) {
        this.tareas = this.tareas.map((tarea) =>
          tarea.id === tareaTemporal.id ? data as Tarea : tarea
        );
        this.ordenarTareas();
        this.guardarCacheLocal();
      }
      this.mensaje = 'Tarea creada correctamente.';
      this.changeDetector.markForCheck();
    } catch (error) {
      this.tareas = tareasAnteriores;
      this.guardarCacheLocal();
      this.titulo = tituloLimpio;
      this.mensaje = error instanceof Error
        ? `No se pudo guardar la tarea: ${error.message}`
        : 'No se pudo guardar la tarea. Comprueba tu conexión con Supabase.';
      this.changeDetector.markForCheck();
    } finally {
      this.cargando = false;
      this.changeDetector.markForCheck();
    }
  }

  async editarTarea(tarea: Tarea) {
    const nuevoTitulo = prompt(
      'Escribe el nuevo título:',
      tarea.titulo
    );

    if (nuevoTitulo === null) {
      return;
    }

    if (!nuevoTitulo.trim()) {
      this.mensaje = 'El título no puede estar vacío.';
      return;
    }

    const tituloAnterior = tarea.titulo;
    this.actualizarEnPantalla(tarea.id, { titulo: nuevoTitulo.trim() });

    try {
      const { data, error } = await this.tareasService.actualizarTarea(
      tarea.id,
      nuevoTitulo.trim(),
      tarea.completada
      );

      if (error) {
        this.actualizarEnPantalla(tarea.id, { titulo: tituloAnterior });
        this.mensaje = error.message;
        this.changeDetector.markForCheck();
        return;
      }

      if (data) this.reemplazarTarea(data as Tarea);
      this.mensaje = 'Tarea actualizada.';
      this.changeDetector.markForCheck();
    } catch (error) {
      this.actualizarEnPantalla(tarea.id, { titulo: tituloAnterior });
      this.mensaje = error instanceof Error ? error.message : 'No se pudo actualizar la tarea.';
      this.changeDetector.markForCheck();
    }
  }

  async cambiarEstado(tarea: Tarea) {
    const estadoAnterior = tarea.completada;
    this.actualizarEnPantalla(tarea.id, { completada: !estadoAnterior });

    try {
      const { data, error } = await this.tareasService.actualizarTarea(
        tarea.id,
        tarea.titulo,
        !estadoAnterior
      );

      if (error) {
        this.actualizarEnPantalla(tarea.id, { completada: estadoAnterior });
        this.mensaje = error.message;
        this.changeDetector.markForCheck();
        return;
      }

      if (data) this.reemplazarTarea(data as Tarea);
    } catch (error) {
      this.actualizarEnPantalla(tarea.id, { completada: estadoAnterior });
      this.mensaje = error instanceof Error ? error.message : 'No se pudo cambiar la tarea.';
      this.changeDetector.markForCheck();
    }
  }

  async eliminarTarea(id: number) {
    const anteriores = this.tareas;
    this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
    this.guardarCacheLocal();

    try {
      const { error } = await this.tareasService.eliminarTarea(id);

      if (error) {
        this.tareas = anteriores;
        this.guardarCacheLocal();
        this.mensaje = error.message;
        this.changeDetector.markForCheck();
        return;
      }

      this.mensaje = 'Tarea eliminada.';
      this.changeDetector.markForCheck();
    } catch (error) {
      this.tareas = anteriores;
      this.guardarCacheLocal();
      this.mensaje = error instanceof Error ? error.message : 'No se pudo eliminar la tarea.';
      this.changeDetector.markForCheck();
    }
  }

  async cerrarSesion() {
    try {
      await this.authService.cerrarSesion();
      if (this.usuarioId) this.tareasService.limpiarCache(this.usuarioId);
      await this.router.navigate(['/login']);
    } catch (error) {
      this.mensaje = error instanceof Error
        ? error.message
        : 'No fue posible cerrar sesión.';
    }
  }

  ngOnDestroy() {
    if (this.canal) {
      void this.tareasService.dejarDeEscuchar(this.canal);
    }
  }

  private guardarCacheLocal(): void {
    if (this.usuarioId) this.tareasService.guardarCache(this.usuarioId, this.tareas);
  }

  private actualizarEnPantalla(id: number, cambios: Partial<Tarea>): void {
    this.tareas = this.tareas.map((tarea) => tarea.id === id ? { ...tarea, ...cambios } : tarea);
    this.guardarCacheLocal();
    this.changeDetector.markForCheck();
  }

  private reemplazarTarea(tareaActualizada: Tarea): void {
    this.tareas = this.tareas.map((tarea) => tarea.id === tareaActualizada.id ? tareaActualizada : tarea);
    this.ordenarTareas();
    this.guardarCacheLocal();
    this.changeDetector.markForCheck();
  }

  private ordenarTareas(): void {
    this.tareas = [...this.tareas].sort((a, b) =>
      b.created_at.localeCompare(a.created_at)
    );
  }
}
