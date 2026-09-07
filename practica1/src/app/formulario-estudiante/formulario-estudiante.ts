import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-estudiante',
  imports: [FormsModule],
  templateUrl: './formulario-estudiante.html',
  styleUrl: './formulario-estudiante.css',
})
export class FormularioEstudiante {
  nombre: string = '';
  edad: number | null = null;
  codigo: string = '';

  @Output() estudianteAgregado = new EventEmitter<any>();

  agregarEstudiante() {

    if (this.nombre === '' || this.edad === null || this.codigo === '') {
      return;
    }

    const estudiante = {
      nombre: this.nombre,
      edad: this.edad,
      codigo: this.codigo
    };

    this.estudianteAgregado.emit(estudiante);
    this.nombre = '';
    this.edad = null;
    this.codigo = '';
  }
}
