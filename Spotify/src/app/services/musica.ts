import { Injectable } from '@angular/core';
import { Cancion } from '../models/cancion';
import { Trie } from '../estructuras/trie';
import { MaxHeap } from '../estructuras/max-heap';
import { Grafo } from '../estructuras/grafo';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  private trie = new Trie();
  private heap = new MaxHeap();
  private grafo = new Grafo();

  private canciones: Cancion[] = [
    {
      id: 1,
      titulo: 'Provenza',
      artista: 'Karol G',
      reproducciones: 9800
    },
    {
      id: 2,
      titulo: 'Tusa',
      artista: 'Karol G',
      reproducciones: 8500
    },
    {
      id: 3,
      titulo: 'Bichota',
      artista: 'Karol G',
      reproducciones: 7200
    },
    {
      id: 4,
      titulo: 'Despechá',
      artista: 'Rosalía',
      reproducciones: 6500
    },
    {
      id: 5,
      titulo: 'Felices los 4',
      artista: 'Maluma',
      reproducciones: 5000
    },
    {
      id: 6,
      titulo: 'Soltera',
      artista: 'Shakira',
      reproducciones: 4200
    },
    {
      id: 7,
      titulo: 'Sola',
      artista: 'Anuel AA',
      reproducciones: 3000
    },
    {
      id: 8,
      titulo: 'Solo de mí',
      artista: 'Bad Bunny',
      reproducciones: 5800
    }
  ];

  constructor() {
    for (const cancion of this.canciones) {
      this.trie.insertar(cancion.titulo);
      this.heap.insertar(cancion);
      this.grafo.agregarVertice(cancion.id);
    }

    // Relaciones entre canciones
    this.grafo.agregarArista(1, 2);
    this.grafo.agregarArista(1, 3);
    this.grafo.agregarArista(2, 3);
    this.grafo.agregarArista(2, 5);
    this.grafo.agregarArista(3, 4);
    this.grafo.agregarArista(4, 6);
    this.grafo.agregarArista(5, 7);
    this.grafo.agregarArista(7, 8);
  }

  obtenerCanciones(): Cancion[] {
    return this.canciones;
  }

  insertarCancion(
    titulo: string,
    artista: string,
    reproducciones: number
  ): boolean {

    titulo = titulo.trim();
    artista = artista.trim();

    if (
      !titulo ||
      !artista ||
      !Number.isInteger(reproducciones) ||
      reproducciones < 0 ||
      this.trie.buscar(titulo)
    ) {
      return false;
    }

    const nueva: Cancion = {

      id: this.canciones.length + 1,
      titulo: titulo,
      artista: artista,
      reproducciones: reproducciones
    };

    this.canciones.push(nueva);
    this.trie.insertar(nueva.titulo);
    this.heap.insertar(nueva);
    this.grafo.agregarVertice(nueva.id);
    return true;
  }

  buscarCancion(titulo: string): boolean {
    return this.trie.buscar(titulo.trim());
  }

  sugerirCanciones(prefijo: string): string[] {
    if (!prefijo.trim()) {
      return [];
    }
    return this.trie.sugerencias(prefijo.trim());
  }

  obtenerRanking(cantidad: number): Cancion[] {
    return this.heap.obtenerTop(cantidad);
  }

  obtenerRecomendaciones(id: number): Cancion[] {
    const relacionadas =
      this.grafo.obtenerRelacionadas(id);

    return this.canciones.filter(
      cancion => relacionadas.includes(cancion.id)
    );
  }

  relacionarCanciones(
    origen: number,
    destino: number
  ): boolean {

    if (
      origen === destino ||
      !this.canciones.some(c => c.id === origen) ||
      !this.canciones.some(c => c.id === destino)
    ) {
      return false;
    }
    this.grafo.agregarArista(origen, destino);
    return true;
  }
}