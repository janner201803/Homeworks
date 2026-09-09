import { Component, DoCheck, Input } from '@angular/core';
import { DoubleLinkedList, Node } from '../listaDoblementeEnlazada';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-atencion',
  imports: [FormsModule],
  templateUrl: './atencion.html',
  styleUrl: './atencion.css',
})
export class Atencion implements DoCheck {

  @Input() lista!: DoubleLinkedList;
  nodoActual: Node | null = null;

  ngDoCheck(): void {
    if (this.nodoActual === null && this.lista.head !== null) {
      this.nodoActual = this.lista.head;
    }
  }
  ngOnChanges(): void {
    if (this.lista && this.nodoActual === null) {
      this.nodoActual = this.lista.head;
    }
  }

  siguientePaciente(): void {
    const nodo = this.nodoActual;
    if (nodo !== null && nodo.next !== null) {
      this.nodoActual = nodo.next;
    }
  }

  pacienteAnterior(): void {
    const nodo = this.nodoActual;
    if (nodo !== null && nodo.previous !== null) {
      this.nodoActual = nodo.previous;
    }
  }

  obtenerHistorial(): any[] {
    return this.lista ? this.lista.print() : [];
  }

  obtenerPosicion(): number {
    let current = this.lista.head;
    let posicion = 1;

    while (current !== null) {
      if (current === this.nodoActual) {
        return posicion;
      }
      current = current.next;
      posicion++;
    }
    return 0;
  }
}
