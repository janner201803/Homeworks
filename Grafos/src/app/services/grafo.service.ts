import { Injectable } from '@angular/core';

import {
  Persona,
  Ciudad,
  NodoGrafo,
  AristaGrafo
} from '../models/grafo.model';

@Injectable({
  providedIn: 'root'
})
export class GrafoService {

  // Información de personas, ciudades, nodos y conexiones.
  private personas: Persona[] = [];
  private ciudades: Ciudad[] = [];
  private nodos: NodoGrafo[] = [];
  private aristas: AristaGrafo[] = [];

  // Genera un identificador único.
  private generarId(): string {
    return crypto.randomUUID();
  }

  // =====================================================
  // CIUDADES
  // =====================================================

  agregarCiudad(nombre: string): string {
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      throw new Error('El nombre de la ciudad es obligatorio.');
    }

    // Evita registrar ciudades con el mismo nombre.
    const ciudadExistente = this.ciudades.find(
      ciudad =>
        ciudad.nombre.toLowerCase() === nombreLimpio.toLowerCase()
    );

    if (ciudadExistente) {
      throw new Error('Esta ciudad ya está registrada.');
    }

    const ciudad: Ciudad = {
      id: this.generarId(),
      nombre: nombreLimpio
    };

    this.ciudades.push(ciudad);

    // Cada ciudad también es un nodo del grafo.
    this.nodos.push({
      id: ciudad.id,
      tipo: 'ciudad',
      nombre: ciudad.nombre
    });

    return ciudad.id;
  }

  obtenerCiudades(): Ciudad[] {
    return [...this.ciudades];
  }

  buscarCiudad(id: string): Ciudad | undefined {
    return this.ciudades.find(ciudad => ciudad.id === id);
  }

  // =====================================================
  // PERSONAS
  // =====================================================

  agregarPersona(
    nombre: string,
    edad: number,
    ciudadId: string
  ): string {

    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      throw new Error('El nombre de la persona es obligatorio.');
    }

    // El nombre identifica a la persona en este proyecto; así no se puede
    // volver a registrar a la misma persona con otra ciudad.
    const personaExistente = this.personas.find(
      persona => persona.nombre.trim().toLocaleLowerCase() === nombreLimpio.toLocaleLowerCase()
    );

    if (personaExistente) {
      const ciudadActual = this.buscarCiudad(personaExistente.ciudadId);
      throw new Error(
        `${personaExistente.nombre} ya está registrada${ciudadActual ? ` y vive en ${ciudadActual.nombre}` : ''}. Una persona solo puede vivir en una ciudad.`
      );
    }

    if (!Number.isInteger(edad) || edad < 0 || edad > 130) {
      throw new Error('La edad debe ser un número entero entre 0 y 130.');
    }

    const ciudad = this.buscarCiudad(ciudadId);

    if (!ciudad) {
      throw new Error('Debes seleccionar una ciudad válida.');
    }

    const persona: Persona = {
      id: this.generarId(),
      nombre: nombreLimpio,
      edad,
      ciudadId: ciudad.id
    };

    this.personas.push(persona);

    // La persona se representa como un nodo.
    this.nodos.push({
      id: persona.id,
      tipo: 'persona',
      nombre: persona.nombre,
      edad: persona.edad
    });

    // Se crea automáticamente una única conexión
    // entre la persona y su ciudad.
    this.aristas.push({
      origen: persona.id,
      destino: ciudad.id
    });

    return persona.id;
  }

  obtenerPersonas(): Persona[] {
    return [...this.personas];
  }

  buscarPersona(id: string): Persona | undefined {
    return this.personas.find(persona => persona.id === id);
  }

  // =====================================================
  // CONEXIONES
  // =====================================================

  /**
   * Crea una conexión entre una persona y una ciudad.
   *
   * REGLA:
   * Una persona solo puede tener una conexión con una ciudad.
   * Si ya está conectada, no se permite crear otra conexión.
   */
  agregarConexion(personaId: string, ciudadId: string): void {

    const persona = this.buscarPersona(personaId);
    const ciudad = this.buscarCiudad(ciudadId);

    if (!persona) {
      throw new Error('La persona no existe.');
    }

    if (!ciudad) {
      throw new Error('La ciudad no existe.');
    }

    // Comprobamos si la persona ya tiene una conexión.
    const yaTieneConexion = this.aristas.some(
      arista =>
        arista.origen === personaId ||
        arista.destino === personaId
    );

    if (yaTieneConexion) {
      throw new Error(
        `${persona.nombre} ya tiene una conexión con una ciudad. No puede conectarse con otra.`
      );
    }

    // Creamos la conexión solo si no tiene ninguna.
    this.aristas.push({
      origen: personaId,
      destino: ciudadId
    });

    // Actualizamos también la ciudad de la persona.
    persona.ciudadId = ciudadId;
  }

  obtenerAristas(): AristaGrafo[] {
    return [...this.aristas];
  }

  // =====================================================
  // CONSULTAS
  // =====================================================

  /**
   * Obtiene todas las personas que viven en una ciudad.
   */
  personasPorCiudad(ciudadId: string): Persona[] {

    return this.personas.filter(
      persona => persona.ciudadId === ciudadId
    );
  }

  /**
   * Obtiene la ciudad en la que vive una persona.
   */
  ciudadPorPersona(personaId: string): Ciudad | undefined {

    const persona = this.buscarPersona(personaId);

    if (!persona) {
      return undefined;
    }

    return this.buscarCiudad(persona.ciudadId);
  }

  /**
   * Busca un nodo por su identificador.
   */
  buscarNodo(id: string): NodoGrafo | undefined {
    return this.nodos.find(nodo => nodo.id === id);
  }

  // =====================================================
  // OPERACIONES DEL GRAFO
  // =====================================================

  obtenerNodos(): NodoGrafo[] {
    return [...this.nodos];
  }

  estaVacio(): boolean {
    return this.nodos.length === 0;
  }

  /**
   * Elimina una persona o una ciudad.
   *
   * Si se elimina una persona, también se elimina su conexión.
   * Si se elimina una ciudad, también se eliminan las conexiones
   * de las personas que estaban asociadas a ella.
   */
  eliminarNodo(id: string): void {

    const nodo = this.buscarNodo(id);

    if (!nodo) {
      return;
    }

    if (nodo.tipo === 'persona') {

      this.personas = this.personas.filter(
        persona => persona.id !== id
      );

    } else {

      // Una ciudad no puede seguir asignada a personas
      // si la ciudad ha sido eliminada.
      const personasAfectadas = this.personas.filter(
        persona => persona.ciudadId === id
      );

      const idsPersonas = personasAfectadas.map(
        persona => persona.id
      );

      this.personas = this.personas.filter(
        persona => persona.ciudadId !== id
      );

      // Eliminamos también los nodos de esas personas.
      this.nodos = this.nodos.filter(
        nodo =>
          nodo.id !== id &&
          !idsPersonas.includes(nodo.id)
      );

    }

    // Eliminamos todas las aristas conectadas al nodo.
    this.aristas = this.aristas.filter(
      arista =>
        arista.origen !== id &&
        arista.destino !== id
    );

    // Eliminamos el nodo solicitado.
    this.nodos = this.nodos.filter(
      nodo => nodo.id !== id
    );
  }

  /**
   * Imprime la lista de adyacencia en la consola.
   */
  imprimirAdyacencia(): void {

    console.log('LISTA DE ADYACENCIA');

    for (const nodo of this.nodos) {

      const conexiones = this.aristas
        .filter(
          arista =>
            arista.origen === nodo.id ||
            arista.destino === nodo.id
        )
        .map(arista => {
          const otroId =
            arista.origen === nodo.id
              ? arista.destino
              : arista.origen;

          return this.buscarNodo(otroId)?.nombre ?? 'Nodo desconocido';
        });

      console.log(
        `${nodo.nombre}: ${
          conexiones.length > 0
            ? conexiones.join(', ')
            : 'Sin conexiones'
        }`
      );
    }
  }

  /**
   * Muestra el grafo completo en la consola.
   */
  imprimirGrafo(): void {
    console.log('NODOS:', this.nodos);
    console.log('ARISTAS:', this.aristas);
    console.log('PERSONAS:', this.personas);
    console.log('CIUDADES:', this.ciudades);
  }
}
