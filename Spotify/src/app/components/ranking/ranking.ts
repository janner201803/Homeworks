import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicaService } from '../../services/musica';
import { Cancion } from '../../models/cancion';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ranking.html',
  styleUrl: './ranking.scss'
})
export class Ranking {
  private musica = inject(MusicaService);
  cantidad: number = 5;

  get ranking(): Cancion[] {
    return this.musica.obtenerRanking(this.cantidad);
  }
}