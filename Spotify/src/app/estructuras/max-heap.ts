import { Cancion } from '../models/cancion';
export class MaxHeap {
  private heap: Cancion[] = [];

  insertar(cancion: Cancion): void {
    this.heap.push(cancion);
    this.subir(this.heap.length - 1);
  }

  private subir(indice: number): void {
    while (indice > 0) {
      const padre = Math.floor((indice - 1) / 2);

      if (
        this.heap[padre].reproducciones >=
        this.heap[indice].reproducciones
      ) {
        break;
      }

      [this.heap[padre], this.heap[indice]] =
        [this.heap[indice], this.heap[padre]];
      indice = padre;
    }
  }

  extraerMaximo(): Cancion | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const maximo = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bajar(0);
    return maximo;
  }

  private bajar(indice: number): void {
    while (true) {
      let mayor = indice;
      const izquierdo = indice * 2 + 1;
      const derecho = indice * 2 + 2;

      if (
        izquierdo < this.heap.length &&
        this.heap[izquierdo].reproducciones >
        this.heap[mayor].reproducciones
      ) {
        mayor = izquierdo;
      }

      if (
        derecho < this.heap.length &&
        this.heap[derecho].reproducciones >
        this.heap[mayor].reproducciones
      ) {
        mayor = derecho;
      }

      if (mayor === indice) {
        break;
      }

      [this.heap[indice], this.heap[mayor]] =
        [this.heap[mayor], this.heap[indice]];
      indice = mayor;
    }
  }

  obtenerTop(cantidad: number): Cancion[] {
    const copia = new MaxHeap();
    copia.heap = [...this.heap];
    const resultado: Cancion[] = [];

    while (
      resultado.length < cantidad &&
      copia.heap.length > 0
    ) {

      resultado.push(copia.extraerMaximo()!);
    }
    return resultado;
  }
}