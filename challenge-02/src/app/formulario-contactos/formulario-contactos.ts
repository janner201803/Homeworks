import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-contactos',
  imports: [FormsModule],
  templateUrl: './formulario-contactos.html',
  styleUrl: './formulario-contactos.css'
})
export class FormularioContactos {

  @Output() contactoCreado = new EventEmitter<any>();

  nombre = '';
  telefono = '';
  email = '';

  agregarContacto() {

    const contacto = {
      nombre: this.nombre,
      telefono: this.telefono,
      email: this.email
    };

    console.log('Contacto enviado:', contacto);

    this.contactoCreado.emit(contacto);
  }
}