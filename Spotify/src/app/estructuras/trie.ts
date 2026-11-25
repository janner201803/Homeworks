class NodoTrie {
  hijos: Map<string, NodoTrie> = new Map();
  finPalabra: boolean = false;
  titulo: string = '';
}

export class Trie {
  private raiz: NodoTrie = new NodoTrie();
  insertar(titulo: string): void {
    let nodo = this.raiz;

    for (const letra of titulo.toLowerCase()) {

      if (!nodo.hijos.has(letra)) {
        nodo.hijos.set(letra, new NodoTrie());
      }
      nodo = nodo.hijos.get(letra)!;
    }
    nodo.finPalabra = true;
    nodo.titulo = titulo;
  }

  buscar(titulo: string): boolean {
    let nodo = this.raiz;

    for (const letra of titulo.toLowerCase()) {
      if (!nodo.hijos.has(letra)) {
        return false;
      }
      nodo = nodo.hijos.get(letra)!;
    }
    return nodo.finPalabra;
  }

  sugerencias(prefijo: string): string[] {
    let nodo = this.raiz;

    for (const letra of prefijo.toLowerCase()) {
      if (!nodo.hijos.has(letra)) {
        return [];
      }
      nodo = nodo.hijos.get(letra)!;
    }

    const resultados: string[] = [];
    this.recorrer(nodo, resultados);
    return resultados;
  }

  private recorrer(
    nodo: NodoTrie,
    resultados: string[]
  ): void {

    if (nodo.finPalabra) {
      resultados.push(nodo.titulo);
    }

    for (const hijo of nodo.hijos.values()) {
      this.recorrer(hijo, resultados);
    }
  }
}