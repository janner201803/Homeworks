import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArbolBinario } from './arbol-binario/arbol-binario';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ArbolBinario],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ArbolBinario');
}
