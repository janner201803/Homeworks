import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicaService } from '../../services/musica';
import { Cancion } from '../../models/cancion';

@Component({
  selector: 'app-recomendaciones',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recomendaciones.html',
  styleUrl: './recomendaciones.scss'
})
export class Recomendaciones {
  private musica = inject(MusicaService);
  seleccionada: number = 0;
  destino: number = 0;
  mensaje: string = '';

  get canciones(): Cancion[] {
    return this.musica.obtenerCanciones();
  }

  get recomendaciones(): Cancion[] {
    return this.musica.obtenerRecomendaciones(
      this.seleccionada
    );
  }

  relacionar(): void {
    const resultado = this.musica.relacionarCanciones(
      this.seleccionada,
      this.destino
    );

    if (resultado) {
      this.mensaje = 'Canciones relacionadas correctamente';

    } else {
      this.mensaje = 'Selecciona dos canciones diferentes';
    }
  }
}