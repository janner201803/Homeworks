export class Nodo {
  title: string;
  link: string;
  component: string;
  children: Nodo[] = [];

  constructor(
    title: string,
    link: string,
    component: string
  ) {
    this.title = title;
    this.link = link;
    this.component = component;
  }

  agregarHijo(nodo: Nodo): void {
    this.children.push(nodo);
  }
}


export class Arbol {

  root: Nodo | null = null;

  constructor(root?: Nodo) {
    if (root) {
      this.root = root;
    }
  }

  agregarHijo(
    padre: Nodo,
    hijo: Nodo
  ): void {
    padre.agregarHijo(hijo);
  }
}