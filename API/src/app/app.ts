import { Component } from '@angular/core';
import { BuscadorGifs } from './components/buscador-gifs/buscador-gifs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BuscadorGifs],
  templateUrl: './app.html'
})
export class App {
}