
import { DatosElemento, Nodo } from './nodo';

export class ArbolNario {
  public raiz: Nodo;

  constructor(datos: DatosElemento[]) {
    const nodos = new Map<string, Nodo>();

    for (const dato of datos) {
      nodos.set(dato.id, new Nodo(dato));
    }

    const raiz = datos.find(dato => dato.parentId === null);

    if (!raiz) {
      throw new Error('El árbol no tiene una raíz.');
    }

    this.raiz = nodos.get(raiz.id)!;

    for (const dato of datos) {
      if (dato.parentId === null) {
        continue;
      }

      const padre = nodos.get(dato.parentId);
      const hijo = nodos.get(dato.id);

      if (!padre || !hijo) {
        continue;
      }

      padre.addChild(hijo);
    }
  }

  buscar(id: string, nodo: Nodo = this.raiz): Nodo | null {
    if (nodo.data.id === id) {
      return nodo;
    }

    for (const hijo of nodo.children) {
      const encontrado = this.buscar(id, hijo);

      if (encontrado) {
        return encontrado;
      }
    }

    return null;
  }

  recorrerDFS(
    nodo: Nodo = this.raiz,
    resultado: DatosElemento[] = []
  ): DatosElemento[] {
    resultado.push(nodo.data);

    for (const hijo of nodo.children) {
      this.recorrerDFS(hijo, resultado);
    }

    return resultado;
  }
}
