import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicaService } from '../../services/musica';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscador.html',
  styleUrl: './buscador.scss'
})
export class Buscador {
  private musica = inject(MusicaService);

  texto: string = '';
  sugerencias: string[] = [];
  resultado: string = '';

  titulo: string = '';
  artista: string = '';
  reproducciones: number = 0;
  mensaje: string = '';

  buscarSugerencias(): void {
    this.sugerencias =
      this.musica.sugerirCanciones(this.texto);
    this.resultado = '';
  }

  buscarExacta(): void {
    if (this.musica.buscarCancion(this.texto)) {
      this.resultado = 'La canción existe';
    } else {

      this.resultado = 'La canción no existe';
    }
  }

  seleccionar(titulo: string): void {
    this.texto = titulo;
    this.sugerencias = [];
    this.buscarExacta();
  }

  agregarCancion(): void {
    const agregado = this.musica.insertarCancion(
      this.titulo,
      this.artista,
      this.reproducciones
    );

    if (agregado) {
      this.mensaje = 'Canción agregada correctamente';
      this.titulo = '';
      this.artista = '';
      this.reproducciones = 0;
      this.buscarSugerencias();

    } else {
      this.mensaje =
        'Datos inválidos o la canción ya existe';
    }
  }
}