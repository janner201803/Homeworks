import { ChangeDetectorRef, Component } from '@angular/core';
import { FormularioContactos } from './formulario-contactos/formulario-contactos';
import { ListaContactos } from './lista-contactos/lista-contactos';

@Component({
  selector: 'app-root',
  imports: [FormularioContactos, ListaContactos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  cargando = true;

  contactos: any[] = [
    {
      nombre: 'Juan Pérez',
      telefono: '3001234567',
      email: 'juan@gmail.com'
    },
    {
      nombre: 'María López',
      telefono: '3109876543',
      email: 'maria@gmail.com'
    },
    {
      nombre: 'Carlos Gómez',
      telefono: '3155555555',
      email: 'carlos@gmail.com'
    }
  ];

  constructor(private cdr: ChangeDetectorRef) {

    setTimeout(() => {

      this.cargando = false;

      this.cdr.detectChanges();

    }, 2000);
  }

  agregarContacto(contacto: any) {
    this.contactos.push(contacto);
  }

  eliminarContacto(indice: number) {
    this.contactos.splice(indice, 1);
  }
}