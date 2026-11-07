import { Producto } from '../models/producto';
import { TrieNode } from './trie-node';

export class Trie {

  private root: TrieNode = new TrieNode();

  // Normalizar texto para facilitar las búsquedas
  private normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  // Insertar un producto
  insert(product: Producto): void {

    const word = this.normalize(product.name);

    if (!word) return;

    let current = this.root;

    for (const character of word) {

      if (!current.children.has(character)) {
        current.children.set(character, new TrieNode());
      }

      current = current.children.get(character)!;
    }

    current.isEndOfWord = true;

    // Actualizar si el producto ya existe
    const existingIndex = current.products.findIndex(
      p => this.normalize(p.name) === word
    );

    if (existingIndex !== -1) {
      current.products[existingIndex] = product;
    } else {
      current.products.push(product);
    }
  }

  // Buscar productos por prefijo
  searchPrefix(prefix: string): Producto[] {

    const word = this.normalize(prefix);

    if (!word) return [];

    let current = this.root;

    // Recorrer el prefijo
    for (const character of word) {

      const child = current.children.get(character);

      if (!child) {
        return [];
      }

      current = child;
    }

    // Obtener todos los productos que empiezan por el prefijo
    const results: Producto[] = [];

    this.collectProducts(current, results);

    return results;
  }

  // Recorrer los nodos para recuperar los productos
  private collectProducts(
    node: TrieNode,
    results: Producto[]
  ): void {

    if (node.isEndOfWord) {
      results.push(...node.products);
    }

    for (const child of node.children.values()) {
      this.collectProducts(child, results);
    }
  }
}