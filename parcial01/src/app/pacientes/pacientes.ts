import { Component, EventEmitter, Output } from '@angular/core';
import { LinkedList } from '../listaSimple';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css',
})
export class Pacientes {
  lista: LinkedList = new LinkedList();

  nuevoPaciente: string = '';
  pacienteParaAtender: string = '';

  @Output() pacienteAtendido = new EventEmitter<any>();

  constructor() {
    this.lista.append('Carlos');
    this.lista.append('Maria');
    this.lista.append('Juan');
  }

  agregarPaciente(): void {
    if (this.nuevoPaciente.trim() === '') {
      return;
    }

    this.lista.append(this.nuevoPaciente);
    this.nuevoPaciente = '';
  }

  atenderPaciente(): void {
    if (this.pacienteParaAtender.trim() === '') {
      return;
    }

    const paciente = this.lista.removePorNombre(
      this.pacienteParaAtender
    );

    if (paciente !== null) {
      this.pacienteAtendido.emit(paciente);
      this.pacienteParaAtender = '';
    } else {
      alert('Ese paciente no está en la lista');
    }
  }

  obtenerPacientes(): any[] {
    return this.lista.print();
  }
}