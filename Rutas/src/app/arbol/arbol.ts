import { Component } from '@angular/core';
import { Arbol, Nodo } from '../arbol_n';

@Component({
  selector: 'app-arbol',
  standalone: true,
  templateUrl: './arbol.html',
  styleUrl: './arbol.css'
})
export class ArbolComponent {

  menuAbierto = false;
  arbol: Arbol;
  elementosAbiertos = new Set<Nodo>();

  constructor() {

    const inicio = new Nodo(
      'Inicio',
      '#',
      'InicioComponent'
    );

    const cursos = new Nodo(
      'Cursos',
      '#',
      'CursosComponent'
    );

    const angular = new Nodo(
      'Angular',
      '#',
      'AngularComponent'
    );

    const java = new Nodo(
      'Java',
      '#',
      'JavaComponent'
    );

    const python = new Nodo(
      'Python',
      '#',
      'PythonComponent'
    );

    cursos.agregarHijo(angular);
    cursos.agregarHijo(java);
    cursos.agregarHijo(python);

    const proyectos = new Nodo(
      'Proyectos',
      '#',
      'ProyectosComponent'
    );

    const proyecto1 = new Nodo(
      'Proyecto 1',
      '#',
      'Proyecto1Component'
    );

    const proyecto2 = new Nodo(
      'Proyecto 2',
      '#',
      'Proyecto2Component'
    );

    proyectos.agregarHijo(proyecto1);
    proyectos.agregarHijo(proyecto2);

    const contacto = new Nodo(
      'Contacto',
      '#',
      'ContactoComponent'
    );

    const menu = new Nodo(
      'Menú',
      '#',
      'MenuComponent'
    );

    menu.agregarHijo(inicio);
    menu.agregarHijo(cursos);
    menu.agregarHijo(proyectos);
    menu.agregarHijo(contacto);

    this.arbol = new Arbol(menu);
  }

  abrirMenu(): void {
    this.menuAbierto = true;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  tieneHijos(nodo: Nodo): boolean {
    return nodo.children.length > 0;
  }

  alternarSubmenu(nodo: Nodo): void {

    if (this.elementosAbiertos.has(nodo)) {
      this.elementosAbiertos.delete(nodo);
    } else {
      this.elementosAbiertos.add(nodo);
    }
  }

  estaAbierto(nodo: Nodo): boolean {
    return this.elementosAbiertos.has(nodo);
  }
}