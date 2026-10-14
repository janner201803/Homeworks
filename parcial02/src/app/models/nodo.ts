
export type TipoElemento = 'carpeta' | 'archivo';

export interface DatosElemento {
  id: string;
  nombre: string;
  tipo: TipoElemento;
  parentId: string | null;
  ownerUid: string;
  ownerEmail: string;
  createdAt?: unknown;
}

export class Nodo {
  public children: Nodo[] = [];

  constructor(public data: DatosElemento) {}

  addChild(nuevoNodo: Nodo): void {
    if (this.data.tipo !== 'carpeta') {
      throw new Error('Un archivo no puede tener hijos.');
    }

    if (nuevoNodo.data.id === this.data.id) {
      throw new Error('Un nodo no puede ser hijo de sí mismo.');
    }

    this.children.push(nuevoNodo);
  }

  isLeaf(): boolean {
    return this.children.length === 0;
  }
}
