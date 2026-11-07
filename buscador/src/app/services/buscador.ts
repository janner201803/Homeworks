import { Injectable } from '@angular/core';

import { Producto } from '../models/producto';

import { Trie } from '../structures/trie';

import { MaxHeap } from '../structures/min-heap';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  private trie = new Trie();

  // Insertar productos
  insert(product: Producto): void {

    this.trie.insert(product);
  }

  // Buscar por prefijo y devolver los K más populares
  searchTopK(prefix: string, k: number): Producto[] {

    // Primero buscamos en el Trie
    const products = this.trie.searchPrefix(prefix);

    // Si no encontramos productos
    if (products.length === 0 || k <= 0) {
      return [];
    }

    // Creamos el Heap con los productos encontrados
    const heap = new MaxHeap();

    heap.heapify(products);

    // Extraemos los K productos más populares
    const results: Producto[] = [];

    while (heap.size() > 0 && results.length < k) {

      const product = heap.pop();

      if (product) {
        results.push(product);
      }
    }

    return results;
  }
}