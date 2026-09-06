import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LinkedList, Node } from '../linkedList';

@Component({
  selector: 'app-playlist',
  imports: [FormsModule],
  templateUrl: './playlist.html',
  styleUrl: './playlist.css'
})
export class Playlist {

  playlist = new LinkedList();
  nuevaCancion = '';
  busqueda = '';
  resultadoBusqueda = '';
  cancionActual: Node | null = null;

  constructor() {
    this.playlist.append('Blinding Lights');
    this.playlist.append('Shape of You');
    this.playlist.append('Believer');
    this.playlist.append('Starboy');
    this.playlist.append('Counting Stars');
    this.cancionActual = this.playlist.head;
  }
  agregarCancion(): void {
    if (this.nuevaCancion.trim() === '') {
      return;
    }
    this.playlist.append(this.nuevaCancion);
    if (this.cancionActual === null) {
      this.cancionActual = this.playlist.head;
    }
    this.nuevaCancion = '';
  }

  buscarCancion(): void {
    if (this.busqueda.trim() === '') {
      this.resultadoBusqueda = 'Escribe una canción para buscar';
      return;
    }
    let current: Node | null = this.playlist.head;
    let posicion = 0;
    while (current !== null) {
      if (
        current.value
          .toLowerCase()
          .includes(this.busqueda.toLowerCase())
      ) {
        this.resultadoBusqueda =
          `🎵 Canción encontrada: "${current.value}" en la posición ${posicion + 1}`;
        return;
      }
      current = current.next;
      posicion++;
    }
    this.resultadoBusqueda =
      `No se encontró "${this.busqueda}"`;
  }

  eliminarCancion(index: number): void {
    const nodoEliminar = this.playlist.peek(index);
    if (nodoEliminar === null) {
      return;
    }
    if (this.cancionActual === nodoEliminar) {
      const siguiente = this.cancionActual.next;
      if (siguiente !== null) {
        this.cancionActual = siguiente;
      } else {
        this.cancionActual = null;
      }
    }

    this.playlist.remove(index);
    if (
      this.cancionActual === null &&
      this.playlist.head !== null
    ) {
      this.cancionActual = this.playlist.head;
    }
  }

  siguienteCancion(): void {
    if (
      this.cancionActual !== null &&
      this.cancionActual.next !== null
    ) {
      this.cancionActual = this.cancionActual.next;
    }
  }

  obtenerCanciones(): string[] {
    const canciones: string[] = [];
    let current: Node | null = this.playlist.head;
    while (current !== null) {
      canciones.push(current.value);
      current = current.next;
    }
    return canciones;
  }
}

