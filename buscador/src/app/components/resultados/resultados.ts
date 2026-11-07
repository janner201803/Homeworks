import { Component, Input } from '@angular/core';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css'
})
export class Resultados {

  @Input() resultados: Producto[] = [];

}