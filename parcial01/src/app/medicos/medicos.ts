import { Component, OnInit, OnDestroy,ChangeDetectorRef } from '@angular/core';
import { CircularLinkedList } from '../listaCircular';

@Component({
  selector: 'app-medicos',
  imports: [],
  templateUrl: './medicos.html',
  styleUrl: './medicos.css',
})
export class Medicos implements OnInit, OnDestroy {

  lista: CircularLinkedList = new CircularLinkedList();

  medicoActual: any = null;

  intervalo: any;

  constructor(private detector: ChangeDetectorRef) {
    this.lista.append('Dr. Pérez');
    this.lista.append('Dra. Gómez');
    this.lista.append('Dr. Rodríguez');
    this.medicoActual = this.lista.peek()?.value;
  }

  ngOnInit(): void {
    this.intervalo = setInterval(() => {
      this.siguienteMedico();
    }, 10000);
  }

  siguienteMedico(): void {
    if (this.lista.head !== null) {
      this.lista.head = this.lista.head.next;
      this.medicoActual = this.lista.head?.value;
      this.detector.detectChanges();
    }
  }

  obtenerMedicos(): any[] {
    return this.lista.print();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }
}