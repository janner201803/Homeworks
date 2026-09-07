import { Component } from '@angular/core';
import { FormularioEstudiante } from './formulario-estudiante/formulario-estudiante';
import { ListadoEstudiantes } from './listado-estudiantes/listado-estudiantes';
import { LinkedList } from './linkedList';

@Component({
  selector: 'app-root',
  imports: [
    FormularioEstudiante,
    ListadoEstudiantes
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  listaEstudiantes = new LinkedList();
  estudiantes: any[] = [];

  constructor() {
    this.agregarEstudiante({
      nombre: 'Juan Pérez',
      edad: 20,
      codigo: '2026001'
    });
    this.agregarEstudiante({
      nombre: 'María Gómez',
      edad: 21,
      codigo: '2026002'
    });
  }
  agregarEstudiante(estudiante: any) {
    this.listaEstudiantes.append(estudiante);
    this.estudiantes = this.listaEstudiantes.print();
  }

  eliminarEstudiante(index: number) {
    this.listaEstudiantes.remove(index);
    this.estudiantes = this.listaEstudiantes.print();
  }

}