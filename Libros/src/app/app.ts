import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormularioLibro} from './formulario-libro/formulario-libro';
import {ListarLibro} from './listar-libro/listar-libro';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormularioLibro, ListarLibro],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Libros');
}
