import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-estudiantes',
  imports: [FormsModule],
  templateUrl: './listado-estudiantes.html',
  styleUrl: './listado-estudiantes.css',
})
export class ListadoEstudiantes {
  @Input() estudiantes: any[] = [];

  @Output() estudianteEliminado = new EventEmitter<number>();

  buscar: string = '';

  eliminarEstudiante(index: number) {
    this.estudianteEliminado.emit(index);
  }

  estudiantesFiltrados() {
    if (this.buscar === '') {
      return this.estudiantes;
    }
    return this.estudiantes.filter(estudiante =>
      estudiante.nombre.toLowerCase().includes(this.buscar.toLowerCase()) ||
      estudiante.codigo.toLowerCase().includes(this.buscar.toLowerCase())
    );
  }
}
