import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lista-contactos',
  imports: [],
  templateUrl: './lista-contactos.html',
  styleUrl: './lista-contactos.css'
})
export class ListaContactos {

  @Input() contactos: any[] = [];

  @Output() contactoEliminado = new EventEmitter<number>();

  eliminarContacto(indice: number) {
    this.contactoEliminado.emit(indice);
  }

}