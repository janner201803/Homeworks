export class Grafo {
  private adyacencias: Map<number, Set<number>> =
    new Map();

  agregarVertice(id: number): void {
    if (!this.adyacencias.has(id)) {
      this.adyacencias.set(id, new Set<number>());
    }
  }

  agregarArista(origen: number, destino: number): void {
    this.agregarVertice(origen);
    this.agregarVertice(destino);
    this.adyacencias.get(origen)!.add(destino);
    this.adyacencias.get(destino)!.add(origen);
  }

  obtenerRelacionadas(id: number): number[] {
    return Array.from(
      this.adyacencias.get(id) ?? []
    );
  }
}