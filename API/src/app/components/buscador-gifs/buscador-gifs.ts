import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GiphyService } from '../../services/giphy.service';

@Component({
  selector: 'app-buscador-gifs',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscador-gifs.html',
  styleUrl: './buscador-gifs.css'
})
export class BuscadorGifs implements OnDestroy {

  private giphyService = inject(GiphyService);

  busqueda: string = '';
  gifs: any[] = [];
  cargando: boolean = false;
  error: string = '';

  private temporizador: ReturnType<typeof setTimeout> | undefined;

  // Buscar GIFs en GIPHY
  async buscar() {

    const texto = this.busqueda.trim();

    if (!texto) {
      this.gifs = [];
      this.error = '';
      this.cargando = false;
      return;
    }

    this.cargando = true;
    this.error = '';

    try {

      const resultados = await this.giphyService.buscarGifs(texto);

      // Evitar mostrar resultados de una búsqueda anterior
      if (texto === this.busqueda.trim()) {
        this.gifs = resultados;

        if (this.gifs.length === 0) {
          this.error = 'No se encontraron GIFs.';
        }
      }

    } catch (error) {

      console.error('Error al buscar GIFs:', error);

      if (texto === this.busqueda.trim()) {
        this.error = 'Ocurrió un error al consultar GIPHY.';
        this.gifs = [];
      }

    } finally {

      if (texto === this.busqueda.trim()) {
        this.cargando = false;
      }

    }
  }

  // Programar busqueda automatica
  programarBusqueda() {

    clearTimeout(this.temporizador);

    const texto = this.busqueda.trim();

    if (!texto) {
      this.gifs = [];
      this.error = '';
      this.cargando = false;
      return;
    }

    this.temporizador = setTimeout(() => {
      this.buscar();
    }, 500);

  }

  // Limpiar el temporizador al salir del componente
  ngOnDestroy() {
    clearTimeout(this.temporizador);
  }

}
