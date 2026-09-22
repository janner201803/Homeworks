import { Component } from '@angular/core';
import { Stack } from '../pila';

@Component({
  selector: 'app-listar-libro',
  imports: [],
  templateUrl: './listar-libro.html',
  styleUrl: './listar-libro.css',
})
export class ListarLibro {
  pila = new Stack<any>();

  constructor() {
    this.pila.push({
      nombre: 'Cien años de soledad',
      isbn: '978-0307474728',
      autor: 'Gabriel García Márquez',
      editorial: 'Diana'
    });

    this.pila.push({
      nombre: 'El principito',
      isbn: '978-0156012195',
      autor: 'Antoine de Saint-Exupéry',
      editorial: 'Reynal & Hitchcock'
    });

    this.pila.push({
      nombre: 'Don Quijote de la Mancha',
      isbn: '978-8420412146',
      autor: 'Miguel de Cervantes',
      editorial: 'Alfaguara'
    });
  }
  agregarLibro(libro: any) {
    this.pila.push(libro);
  }
  eliminarLibro() {
    this.pila.pop();
  }
  obtenerLibros() {
    return this.pila.print().slice().reverse();
  }
}
