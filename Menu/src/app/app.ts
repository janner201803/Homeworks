import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArbolComponent } from './arbol/arbol';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ArbolComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Menu');
}
