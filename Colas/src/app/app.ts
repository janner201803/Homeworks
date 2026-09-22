import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ColaPersonas} from './cola-personas/cola-personas'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ColaPersonas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Colas');
}
