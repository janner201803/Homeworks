import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DoubleLinkedList, Node } from '../doubleLinkedList';

@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navegador.html',
  styleUrl: './navegador.css'
})
export class Navegador {

  historial = new DoubleLinkedList();
  paginaActual: Node | null = null;
  url = '';
  busqueda = '';
  resultadoBusqueda = '';

  constructor() {
    this.historial.append('Google');
    this.historial.append('YouTube');
    this.historial.append('Wikipedia');
    this.historial.append('GitHub');
    this.paginaActual = this.historial.head;

    if (this.paginaActual !== null) {
      this.url = this.paginaActual.value;
    }
  }

  adelante(): void {

    if (
      this.paginaActual !== null &&
      this.paginaActual.next !== null
    ) {
      this.paginaActual = this.paginaActual.next;
      this.url = this.paginaActual.value;
    }
  }
  atras(): void {
    if (
      this.paginaActual !== null &&
      this.paginaActual.previous !== null
    ) {
      this.paginaActual = this.paginaActual.previous;
      this.url = this.paginaActual.value;
    }
  }
  recargar(): void {
    if (this.paginaActual !== null) {
      this.url = this.paginaActual.value;
    }
  }
  nuevaPagina(): void {
    if (this.url.trim() === '') {
      return;
    }
    this.historial.append(this.url.trim());
    this.paginaActual = this.historial.tail;
    this.resultadoBusqueda = '';
  }
  buscarPagina(): void {
    if (this.busqueda.trim() === '') {
      this.resultadoBusqueda =
        'Escribe una página para buscar';
      return;
    }
    let current: Node | null = this.historial.head;
    while (current !== null) {
      if (
        current.value
          .toLowerCase()
          .includes(this.busqueda.toLowerCase())
      ) {
        this.paginaActual = current;
        this.url = current.value;
        this.resultadoBusqueda =
          `Página encontrada: ${current.value}`;
        return;
      }
      current = current.next;
    }
    this.resultadoBusqueda =
      `No se encontró "${this.busqueda}"`;
  }
  cerrarPagina(): void {
    if (this.paginaActual === null) {
      return;
    }
    const paginaCerrar = this.paginaActual;
    if (paginaCerrar.next !== null) {
      this.paginaActual = paginaCerrar.next;
    }
    else if (paginaCerrar.previous !== null) {
      this.paginaActual = paginaCerrar.previous;
    }
    else {
      this.paginaActual = null;
    }
    let current: Node | null = this.historial.head;
    let index = 0;
    while (
      current !== null &&
      current !== paginaCerrar
    ) {
      current = current.next;
      index++;
    }
    if (current === paginaCerrar) {
      this.historial.remove(index);
    }
    if (this.paginaActual !== null) {
      this.url = this.paginaActual.value;
    } else {
      this.url = '';
    }
  }
  obtenerPaginas(): string[] {
    const paginas: string[] = [];
    let current: Node | null =
      this.historial.head;
    while (current !== null) {
      paginas.push(current.value);
      current = current.next;
    }
    return paginas;
  }
  irAPagina(index: number): void {
    const pagina = this.historial.peek(index);
    if (pagina !== null) {
      this.paginaActual = pagina;
      this.url = pagina.value;
    }
  }
  puedeRetroceder(): boolean {
    return (
      this.paginaActual !== null &&
      this.paginaActual.previous !== null
    );
  }
  puedeAvanzar(): boolean {
    return (
      this.paginaActual !== null &&
      this.paginaActual.next !== null
    );
  }
}