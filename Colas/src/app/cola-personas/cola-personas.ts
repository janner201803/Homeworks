import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Queue } from '../cola';

@Component({
  selector: 'app-cola-personas',
  imports: [FormsModule],
  templateUrl: './cola-personas.html',
  styleUrl: './cola-personas.css',
})
export class ColaPersonas {
  cola = new Queue<any>();

  nombre: string = '';
  monto: number = 0;

  constructor() {
    this.agregarPersonaInicial('Carlos', 200000);
    this.agregarPersonaInicial('Maria', 150000);
    this.agregarPersonaInicial('Juan', 300000);
    this.agregarPersonaInicial('Laura', 100000);
    this.agregarPersonaInicial('Pedro', 250000);
    this.ordenarCola();
  }

  agregarPersonaInicial(nombre: string, monto: number) {
    const persona = {
      nombre: nombre,
      monto: monto,
      horaLlegada: this.generarHora()
    };
    this.cola.enqueue(persona);
  }

  generarHora(): string {
    const hora = Math.floor(Math.random() * 4) + 8;
    const minutos = Math.floor(Math.random() * 60);
    return hora.toString().padStart(2, '0') + ':' +
           minutos.toString().padStart(2, '0');
  }

  ordenarCola() {
    const personas = this.cola.print();
    personas.sort((a, b) =>
      a.horaLlegada.localeCompare(b.horaLlegada)
    );
  }

  agregarPersona() {
    if (this.nombre.trim() === '' || this.monto <= 0) {
      return;
    }
    const persona = {
      nombre: this.nombre,
      monto: this.monto,
      horaLlegada: this.horaActual()
    };

    this.cola.enqueue(persona);
    this.nombre = '';
    this.monto = 0;
  }

  retirarDinero() {
    this.cola.dequeue();
  }

  horaActual(): string {
    const ahora = new Date();
    return ahora.getHours().toString().padStart(2, '0') + ':' +
           ahora.getMinutes().toString().padStart(2, '0');
  }
  obtenerPersonas() {
    return this.cola.print();
  }
}
