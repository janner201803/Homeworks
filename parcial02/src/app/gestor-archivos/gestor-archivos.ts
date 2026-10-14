import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth';
import { ArchivoService } from '../services/archivo';
import { ArbolNario } from '../models/arbol-nario';
import { Nodo, TipoElemento } from '../models/nodo';

@Component({
  selector: 'app-gestor-archivos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestor-archivos.html',
  styleUrl: './gestor-archivos.scss',
})
export class GestorArchivos implements OnInit {
  private authService = inject(AuthService);
  private archivoService = inject(ArchivoService);
  private router = inject(Router);

  arbol: ArbolNario | null = null;
  carpetaActualId = '';

  nombre = '';
  tipo: TipoElemento = 'carpeta';

  cargando = signal(true);

  error = '';
  mensaje = '';

  private uidCargado = '';

  async ngOnInit(): Promise<void> {
    this.cargando.set(true);
    this.error = '';

    try {
      const usuario = await this.authService.esperarUsuario();

      if (!usuario) {
        this.arbol = null;
        this.carpetaActualId = '';
        await this.router.navigate(['/login']);
        return;
      }

      await this.cargarArbol(usuario.uid, usuario.email ?? '');
    } catch (error: unknown) {
      this.error = this.obtenerError(error);
      console.error('Error al iniciar el gestor:', error);
    } finally {
      this.cargando.set(false);
    }
  }

  get usuario() {
    return this.authService.usuario();
  }

  get carpetaActual(): Nodo | null {
    return this.arbol?.buscar(this.carpetaActualId) ?? null;
  }

  async cargarArbol(
    uid?: string,
    email?: string
  ): Promise<void> {
    const usuario = this.usuario;

    const uidUsuario = uid ?? usuario?.uid;
    const emailUsuario = email ?? usuario?.email ?? '';

    if (!uidUsuario) {
      this.arbol = null;
      this.carpetaActualId = '';
      this.uidCargado = '';
      this.error = 'No hay un usuario autenticado.';
      this.cargando.set(false);
      return;
    }

    this.cargando.set(true);
    this.error = '';

    try {
      console.log('Cargando archivos del usuario:', uidUsuario);

      const arbol = await this.archivoService.cargarArbol(
        uidUsuario,
        emailUsuario
      );

      if (this.usuario?.uid !== uidUsuario) {
        this.arbol = null;
        this.carpetaActualId = '';
        this.uidCargado = '';
        return;
      }

      this.arbol = arbol;

      if (!this.arbol.buscar(this.carpetaActualId)) {
        this.carpetaActualId = this.arbol.raiz.data.id;
      }

      this.uidCargado = uidUsuario;

      console.log('Árbol cargado correctamente:', this.arbol);
      console.log('Raíz:', this.arbol.raiz);
      console.log('Contenido de la raíz:', this.arbol.raiz.children);

    } catch (error: unknown) {
      if (this.usuario?.uid === uidUsuario) {
        this.arbol = null;
        this.carpetaActualId = '';
        this.uidCargado = '';
        this.error = this.obtenerError(error);

        console.error('Error al cargar los archivos:', error);
      }
    } finally {
      if (this.usuario?.uid === uidUsuario) {
        this.cargando.set(false);
        console.log('Carga finalizada para el usuario:', uidUsuario);
      }
    }
  }

  async crearElemento(): Promise<void> {
    const usuario = this.usuario;
    const carpeta = this.carpetaActual;

    this.error = '';
    this.mensaje = '';

    if (!usuario || !carpeta) {
      this.error = 'No se encontró la carpeta actual.';
      return;
    }

    if (!this.nombre.trim()) {
      this.error = 'Escribe el nombre del elemento.';
      return;
    }

    try {
      await this.archivoService.crearElemento(
        this.nombre,
        this.tipo,
        carpeta.data,
        usuario.uid,
        usuario.email ?? ''
      );

      this.nombre = '';
      this.mensaje = 'Elemento creado correctamente.';

      await this.cargarArbol();
    } catch (error: unknown) {
      this.error = this.obtenerError(error);
    }
  }

  entrar(nodo: Nodo): void {
    if (nodo.data.tipo !== 'carpeta') {
      return;
    }

    this.carpetaActualId = nodo.data.id;
    this.error = '';
    this.mensaje = '';
  }

  subirNivel(): void {
    const carpeta = this.carpetaActual;

    if (carpeta?.data.parentId) {
      this.carpetaActualId = carpeta.data.parentId;
    }
  }

  irARaiz(): void {
    if (this.arbol) {
      this.carpetaActualId = this.arbol.raiz.data.id;
    }
  }

  async eliminar(nodo: Nodo): Promise<void> {
    const usuario = this.usuario;

    if (!usuario) {
      return;
    }

    const confirmar = window.confirm(
      `¿Deseas eliminar "${nodo.data.nombre}"?`
    );

    if (!confirmar) {
      return;
    }

    this.error = '';
    this.mensaje = '';

    try {
      await this.archivoService.eliminarElemento(
        nodo.data,
        usuario.uid
      );

      this.mensaje = 'Elemento eliminado correctamente.';

      await this.cargarArbol();
    } catch (error: unknown) {
      this.error = this.obtenerError(error);
    }
  }

  async cerrarSesion(): Promise<void> {
    await this.authService.cerrarSesion();

    this.arbol = null;
    this.carpetaActualId = '';
    this.uidCargado = '';

    await this.router.navigate(['/login']);
  }

  private obtenerError(error: unknown): string {
    return error instanceof Error
      ? error.message
      : 'Ocurrió un error inesperado.';
  }
}
