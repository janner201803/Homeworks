import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-libro',
  imports: [FormsModule],
  templateUrl: './formulario-libro.html',
  styleUrl: './formulario-libro.css',
})
export class FormularioLibro {
  nombre: string = '';
  isbn: string = '';
  autor: string = '';
  editorial: string = '';

  @Output() libroAgregado = new EventEmitter<any>();

  agregarLibro() {
    const libro = {
      nombre: this.nombre,
      isbn: this.isbn,
      autor: this.autor,
      editorial: this.editorial
    };

    this.libroAgregado.emit(libro);
    this.nombre = '';
    this.isbn = '';
    this.autor = '';
    this.editorial = '';
  }
}
