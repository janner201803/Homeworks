import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

import * as d3 from 'd3';

import {
  NodoGrafo,
  AristaGrafo
} from '../models/grafo.model';

// Tipo específico para los nodos que manejará D3
interface NodoD3 {
  id: string;
  tipo: 'persona' | 'ciudad';
  nombre: string;
  edad?: number;

  x?: number;
  y?: number;

  fx?: number | null;
  fy?: number | null;
}

// Tipo para las conexiones que manejará D3
interface AristaD3 extends d3.SimulationLinkDatum<NodoD3> {
  source: string | NodoD3;
  target: string | NodoD3;
}

@Component({
  selector: 'app-grafo',
  standalone: true,
  templateUrl: './grafo.html',
  styleUrl: './grafo.css'
})
export class GrafoComponent
  implements AfterViewInit, OnChanges, OnDestroy {

  @Input() nodos: NodoGrafo[] = [];
  @Input() aristas: AristaGrafo[] = [];

  @ViewChild('grafoContainer')
  grafoContainer!: ElementRef<HTMLDivElement>;

  private vistaLista = false;

  private simulacion?: d3.Simulation<NodoD3, undefined>;

  ngAfterViewInit(): void {
    this.vistaLista = true;
    this.dibujarGrafo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.vistaLista) {
      this.dibujarGrafo();
    }
  }

  ngOnDestroy(): void {
    this.simulacion?.stop();
  }

  private dibujarGrafo(): void {

    if (!this.grafoContainer) {
      return;
    }

    const contenedor = this.grafoContainer.nativeElement;

    // Detener la simulación anterior
    this.simulacion?.stop();

    // Limpiar el dibujo anterior
    d3.select(contenedor)
      .selectAll('*')
      .remove();

    const ancho = Math.max(contenedor.clientWidth, 320);
    const alto = 500;

    // Crear el SVG
    const svg = d3
      .select(contenedor)
      .append('svg')
      .attr('width', '100%')
      .attr('height', alto)
      .attr('viewBox', `0 0 ${ancho} ${alto}`)
      .attr('role', 'img')
      .attr('aria-label', 'Grafo de personas y ciudades');

    // Mostrar mensaje si el grafo está vacío
    if (this.nodos.length === 0) {

      svg.append('text')
        .attr('x', ancho / 2)
        .attr('y', alto / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#64748b')
        .attr('font-size', 14)
        .text('Agrega personas y ciudades para visualizar el grafo');

      return;
    }

    // Crear copias para evitar modificar los datos originales
    const nodosD3: NodoD3[] = this.nodos.map(nodo => ({
      id: nodo.id,
      tipo: nodo.tipo,
      nombre: nodo.nombre,
      edad: nodo.edad
    }));

    // Crear conexiones
    const aristasD3: AristaD3[] = this.aristas.map(arista => ({
      source: arista.origen,
      target: arista.destino
    }));

    // Crear la simulación física del grafo
    this.simulacion = d3
      .forceSimulation<NodoD3>(nodosD3)

      .force(
        'link',
        d3.forceLink<NodoD3, AristaD3>(aristasD3)
          .id(d => d.id)
          .distance(130)
      )

      .force(
        'charge',
        d3.forceManyBody<NodoD3>()
          .strength(-450)
      )

      .force(
        'center',
        d3.forceCenter(ancho / 2, alto / 2)
      )

      .force(
        'collision',
        d3.forceCollide<NodoD3>()
          .radius(55)
      );

    // Dibujar las conexiones
    const lineas = svg
      .append('g')
      .attr('class', 'aristas')
      .selectAll<SVGLineElement, AristaD3>('line')
      .data(aristasD3)
      .join('line')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 2);

    // Crear el grupo visual de cada nodo
    const grupos = svg
      .append('g')
      .attr('class', 'nodos')
      .selectAll<SVGGElement, NodoD3>('g')
      .data(nodosD3)
      .join('g')
      .attr('cursor', 'grab');

    // Permitir arrastrar los nodos
    grupos.call(
      d3.drag<SVGGElement, NodoD3>()

        .on('start', (event, d) => {

          if (!event.active) {
            this.simulacion
              ?.alphaTarget(0.3)
              .restart();
          }

          d.fx = d.x ?? 0;
          d.fy = d.y ?? 0;
        })

        .on('drag', (event, d) => {

          d.fx = event.x;
          d.fy = event.y;
        })

        .on('end', (event, d) => {

          if (!event.active) {
            this.simulacion
              ?.alphaTarget(0);
          }

          d.fx = null;
          d.fy = null;
        })
    );

    // Dibujar los círculos
    grupos
      .append('circle')
      .attr('r', d => d.tipo === 'ciudad' ? 34 : 29)
      .attr('fill', d =>
        d.tipo === 'ciudad' ? '#16a34a' : '#2563eb'
      )
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 3);

    // Mostrar el nombre de cada nodo
    grupos
      .append('text')
      .text(d => d.nombre)
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.tipo === 'ciudad' ? 49 : 44)
      .attr('font-size', 12)
      .attr('font-weight', 600)
      .attr('fill', '#1e293b');

    // Mostrar la edad dentro del círculo de cada persona
    grupos
      .filter(d => d.tipo === 'persona')
      .append('text')
      .text(d => `${d.edad ?? 0} años`)
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('fill', '#ffffff')
      .attr('font-size', 10)
      .attr('font-weight', 600);

    // Actualizar la posición de los nodos y las conexiones
    this.simulacion.on('tick', () => {

      lineas
        .attr('x1', d =>
          typeof d.source === 'string'
            ? 0
            : d.source.x ?? 0
        )
        .attr('y1', d =>
          typeof d.source === 'string'
            ? 0
            : d.source.y ?? 0
        )
        .attr('x2', d =>
          typeof d.target === 'string'
            ? 0
            : d.target.x ?? 0
        )
        .attr('y2', d =>
          typeof d.target === 'string'
            ? 0
            : d.target.y ?? 0
        );

      grupos.attr(
        'transform',
        d => `translate(${d.x ?? 0},${d.y ?? 0})`
      );

    });
  }
}
