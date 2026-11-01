import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GrafoComponent } from './grafo/grafo';
import { GrafoService } from './services/grafo.service';

import {
  Persona,
  Ciudad,
  NodoGrafo,
  AristaGrafo
} from './models/grafo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GrafoComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private grafoService = inject(GrafoService);

  // Datos de los formularios
  nombrePersona = '';
  edadPersona: number | null = null;
  ciudadSeleccionada = '';

  nombreCiudad = '';

  // Ciudad para consultar sus habitantes
  ciudadConsulta = '';

  // Información del grafo
  personas: Persona[] = [];
  ciudades: Ciudad[] = [];
  nodos: NodoGrafo[] = [];
  aristas: AristaGrafo[] = [];

  habitantes: Persona[] = [];

  mensaje = '';
  tipoMensaje: 'exito' | 'error' | '' = '';

  constructor() {
    this.actualizarDatos();
  }

  // =====================================================
  // ACTUALIZAR INFORMACIÓN
  // =====================================================

  actualizarDatos(): void {
    this.personas = this.grafoService.obtenerPersonas();
    this.ciudades = this.grafoService.obtenerCiudades();
    this.nodos = this.grafoService.obtenerNodos();
    this.aristas = this.grafoService.obtenerAristas();
  }

  // =====================================================
  // AGREGAR CIUDAD
  // =====================================================

  agregarCiudad(): void {
    try {
      this.grafoService.agregarCiudad(this.nombreCiudad);

      this.nombreCiudad = '';

      this.actualizarDatos();

      this.mostrarMensaje(
        'Ciudad agregada correctamente.',
        'exito'
      );

    } catch (error) {
      this.mostrarMensaje(
        error instanceof Error
          ? error.message
          : 'No se pudo agregar la ciudad.',
        'error'
      );
    }
  }

  // =====================================================
  // AGREGAR PERSONA
  // =====================================================

  agregarPersona(): void {
    try {
      if (this.edadPersona === null) {
        throw new Error('Debes ingresar la edad de la persona.');
      }

      if (!this.ciudadSeleccionada) {
        throw new Error('Debes seleccionar una ciudad.');
      }

      // La persona se registra y se conecta automáticamente
      // con una sola ciudad.
      this.grafoService.agregarPersona(
        this.nombrePersona,
        this.edadPersona,
        this.ciudadSeleccionada
      );

      this.nombrePersona = '';
      this.edadPersona = null;
      this.ciudadSeleccionada = '';

      this.actualizarDatos();

      if (this.ciudadConsulta) {
        this.consultarHabitantes();
      }

      this.mostrarMensaje(
        'Persona agregada y conectada con su ciudad.',
        'exito'
      );

    } catch (error) {
      this.mostrarMensaje(
        error instanceof Error
          ? error.message
          : 'No se pudo agregar la persona.',
        'error'
      );
    }
  }

  // =====================================================
  // CONSULTAR HABITANTES DE UNA CIUDAD
  // =====================================================

  consultarHabitantes(): void {
    if (!this.ciudadConsulta) {
      this.habitantes = [];
      return;
    }

    this.habitantes = this.grafoService.personasPorCiudad(
      this.ciudadConsulta
    );
  }

  // =====================================================
  // ELIMINAR NODO
  // =====================================================

  eliminarNodo(id: string): void {
    const nodo = this.grafoService.buscarNodo(id);

    if (!nodo) {
      this.mostrarMensaje('No se encontró el elemento.', 'error');
      return;
    }

    const mensajeConfirmacion =
      nodo.tipo === 'ciudad'
        ? `¿Eliminar ${nodo.nombre} y las personas asociadas con esa ciudad?`
        : `¿Eliminar a ${nodo.nombre}?`;

    if (!confirm(mensajeConfirmacion)) {
      return;
    }

    this.grafoService.eliminarNodo(id);

    // Si se elimina la ciudad que se estaba consultando,
    // limpiamos la consulta.
    if (this.ciudadConsulta === id) {
      this.ciudadConsulta = '';
      this.habitantes = [];
    }

    this.actualizarDatos();

    if (this.ciudadConsulta) {
      this.consultarHabitantes();
    }

    // Si se eliminó la ciudad seleccionada en el formulario,
    // limpiamos la selección.
    if (
      !this.ciudades.some(
        ciudad => ciudad.id === this.ciudadSeleccionada
      )
    ) {
      this.ciudadSeleccionada = '';
    }

    this.mostrarMensaje(
      'Elemento eliminado correctamente.',
      'exito'
    );
  }

  // =====================================================
  // BUSCAR NODO
  // =====================================================

  buscarNodo(id: string): void {
    const nodo = this.grafoService.buscarNodo(id);

    if (nodo) {
      console.log('Nodo encontrado:', nodo);

      this.mostrarMensaje(
        `Nodo encontrado: ${nodo.nombre}.`,
        'exito'
      );
    } else {
      this.mostrarMensaje(
        'No se encontró el nodo.',
        'error'
      );
    }
  }

  // =====================================================
  // VER CONEXIONES DE UN NODO
  // =====================================================

  verConexiones(id: string): void {
    const nodo = this.grafoService.buscarNodo(id);

    if (!nodo) {
      this.mostrarMensaje(
        'No se encontró el nodo.',
        'error'
      );
      return;
    }

    // Buscamos las aristas que tienen al nodo como origen
    // o destino.
    const conexiones = this.grafoService.obtenerAristas()
      .filter(
        arista =>
          arista.origen === id ||
          arista.destino === id
      );

    if (conexiones.length === 0) {
      this.mostrarMensaje(
        `${nodo.nombre} no tiene conexiones.`,
        'error'
      );
      return;
    }

    // Obtenemos el otro extremo de cada conexión.
    const nombres = conexiones
      .map(arista => {
        const otroId =
          arista.origen === id
            ? arista.destino
            : arista.origen;

        return this.grafoService.buscarNodo(otroId)?.nombre;
      })
      .filter((nombre): nombre is string => nombre !== undefined);

    console.log(`Conexiones de ${nodo.nombre}:`, nombres);

    this.mostrarMensaje(
      `${nodo.nombre} está conectado con: ${nombres.join(', ')}.`,
      'exito'
    );
  }

  // =====================================================
  // IMPRIMIR GRAFO
  // =====================================================

  imprimirGrafo(): void {
    this.grafoService.imprimirGrafo();

    this.grafoService.imprimirAdyacencia();

    this.mostrarMensaje(
      'Contenido del grafo impreso en la consola.',
      'exito'
    );
  }

  // =====================================================
  // MOSTRAR MENSAJES
  // =====================================================

  private mostrarMensaje(
    texto: string,
    tipo: 'exito' | 'error'
  ): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
  }
}