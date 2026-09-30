import {AfterViewInit,Component,ElementRef,ViewChild} from '@angular/core';
import * as d3 from 'd3';
import { BinaryTree, Node } from '../arbolBinario';
import { FormsModule } from '@angular/forms';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-arbol-binario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './arbol-binario.html',
  styleUrl: './arbol-binario.css',
})
export class ArbolBinario implements AfterViewInit {
  @ViewChild('treeContainer')
  treeContainer!: ElementRef<HTMLDivElement>;
  tree = new BinaryTree();
  numero: number | null = null;
  numeroBuscar: number | null = null;

  preorder: number[] = [];
  inorder: number[] = [];
  postorder: number[] = [];
  mensaje = '';

  ngAfterViewInit(): void {
    this.drawTree();
  }

  agregarNumero(): void {
    if (this.numero === null || isNaN(this.numero)) {
      this.mensaje = 'Ingrese un número válido.';
      return;
    }
    if (this.tree.contains(this.numero)) {
      this.mensaje = `El número ${this.numero} ya existe.`;
      return;
    }

    this.tree.insert(this.numero);
    console.log('Número insertado:', this.numero);
    this.actualizarRecorridos();
    this.numero = null;
    this.mensaje = 'Número agregado correctamente.';
    this.drawTree();
  }

  buscarNumero(): void {
    if (
      this.numeroBuscar === null ||
      isNaN(this.numeroBuscar)
    ) {
      this.mensaje = 'Ingrese un número para buscar.';
      return;
    }

    const encontrado = this.tree.contains(this.numeroBuscar);

    if (encontrado) {
      this.mensaje =
        `El número ${this.numeroBuscar} sí está en el árbol.`;
    } else {
      this.mensaje =
        `El número ${this.numeroBuscar} no está en el árbol.`;
    }
    console.log(
      `¿El número ${this.numeroBuscar} está en el árbol?`,
      encontrado
    );
  }

  actualizarRecorridos(): void {
    this.preorder = this.tree.preOrder();
    this.inorder = this.tree.inOrder();
    this.postorder = this.tree.postOrder();
    console.log('PreOrder:', this.preorder);
    console.log('InOrder:', this.inorder);
    console.log('PostOrder:', this.postorder);
  }

  private convertirArbol(
    node: Node | null
  ): TreeNode | null {

    if (node === null) {
      return null;
    }

    const children: TreeNode[] = [];

    if (node.left !== null) {

      const left = this.convertirArbol(node.left);

      if (left !== null) {
        children.push(left);
      }
    }

    if (node.right !== null) {

      const right = this.convertirArbol(node.right);

      if (right !== null) {
        children.push(right);
      }
    }

    return {
      name: node.value.toString(),
      children:
        children.length > 0
          ? children
          : undefined
    };
  }

  private drawTree(): void {

    if (!this.treeContainer) {
      return;
    }

    const container =
      this.treeContainer.nativeElement;

    d3.select(container)
      .selectAll('*')
      .remove();

    if (this.tree.root === null) {
      return;
    }

    const treeData =
      this.convertirArbol(this.tree.root);

    if (treeData === null) {
      return;
    }

    const width = 900;

    const height = 600;

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', '100%')
      .attr(
        'viewBox',
        `0 0 ${width} ${height}`
      )
      .attr(
        'preserveAspectRatio',
        'xMidYMid meet'
      );

    const root =
      d3.hierarchy<TreeNode>(treeData);

    const treeLayout =
      d3
        .tree<TreeNode>()
        .size([
          width - 100,
          height - 100
        ]);

    const rootPosition =
      treeLayout(root);

    svg
      .append('g')
      .attr(
        'transform',
        'translate(50, 50)'
      )
      .selectAll<
        SVGLineElement,
        d3.HierarchyPointLink<TreeNode>
      >('line')
      .data(rootPosition.links())
      .join('line')
      .attr(
        'x1',
        link => link.source.x
      )
      .attr(
        'y1',
        link => link.source.y
      )
      .attr(
        'x2',
        link => link.target.x
      )
      .attr(
        'y2',
        link => link.target.y
      )
      .attr(
        'stroke',
        '#555'
      )
      .attr(
        'stroke-width',
        2
      );

    const nodes = svg
      .append('g')
      .attr(
        'transform',
        'translate(50, 50)'
      )
      .selectAll<
        SVGGElement,
        d3.HierarchyPointNode<TreeNode>
      >('g')
      .data(rootPosition.descendants())
      .join('g')
      .attr(
        'transform',
        node =>
          `translate(${node.x}, ${node.y})`
      );

    nodes
      .append('circle')
      .attr(
        'r',
        25
      )
      .attr(
        'fill',
        '#1976d2'
      )
      .attr(
        'stroke',
        '#0d47a1'
      )
      .attr(
        'stroke-width',
        2
      );

    nodes
      .append('text')
      .text(
        node => node.data.name
      )
      .attr(
        'text-anchor',
        'middle'
      )
      .attr(
        'dominant-baseline',
        'central'
      )
      .attr(
        'fill',
        'white'
      )
      .attr(
        'font-size',
        '16px'
      )
      .attr(
        'font-weight',
        'bold'
      );
  }
}