import { Component } from '@angular/core';

import { Buscador } from './components/buscador/buscador';
import { Ranking } from './components/ranking/ranking';
import { Recomendaciones } from './components/recomendaciones/recomendaciones';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Buscador,
    Ranking,
    Recomendaciones
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}