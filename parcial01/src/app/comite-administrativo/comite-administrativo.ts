import { Component } from '@angular/core';
import { CircularDoubleLinkedList } from '../listaCircularDoble';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comite-administrativo',
  imports: [FormsModule],
  templateUrl: './comite-administrativo.html',
  styleUrl: './comite-administrativo.css',
})
export class ComiteAdministrativo {

  lista: CircularDoubleLinkedList = new CircularDoubleLinkedList();
  nuevoIntegrante: string = '';
  nodoActual: any = null;

  constructor() {
    this.lista.append('Director');
    this.lista.append('Secretaria');
    this.lista.append('Coordinador');
    this.nodoActual = this.lista.head;
  }

  agregarIntegrante(): void {
    if (this.nuevoIntegrante.trim() === '') {
      return;
    }
    this.lista.append(this.nuevoIntegrante);
    this.nuevoIntegrante = '';
    if (this.nodoActual === null) {
      this.nodoActual = this.lista.head;
    }
  }

  siguienteIntegrante(): void {
    if (this.nodoActual !== null) {
      this.nodoActual = this.nodoActual.next;
    }
  }

  integranteAnterior(): void {
    if (this.nodoActual !== null) {
      this.nodoActual = this.nodoActual.previous;
    }
  }
}
