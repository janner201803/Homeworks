import { Component, signal } from '@angular/core';
import {Atencion} from './atencion/atencion';
import {Medicos} from './medicos/medicos';
import {Pacientes} from './pacientes/pacientes';
import {ComiteAdministrativo} from './comite-administrativo/comite-administrativo';
import { DoubleLinkedList } from './listaDoblementeEnlazada';

@Component({
  selector: 'app-root',
  imports: [Atencion, Medicos, Pacientes, ComiteAdministrativo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  listaAtencion: DoubleLinkedList = new DoubleLinkedList(); 
  recibirPaciente(paciente: any): void {
    this.listaAtencion.append(paciente); 
  }
}
