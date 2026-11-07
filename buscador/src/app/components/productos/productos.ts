import { Component, Input } from '@angular/core';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

  @Input() productos: Producto[] = [];

}