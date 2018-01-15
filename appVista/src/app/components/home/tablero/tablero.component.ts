import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {
  nombre: string;
  constructor() { }

  ngOnInit() {
    this.nombre = sessionStorage.getItem('nombre');

  }

}
