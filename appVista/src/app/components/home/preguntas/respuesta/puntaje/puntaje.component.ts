import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.css']
})
export class PuntajeComponent implements OnInit {
   numberEstrellas ;
   arreglos: number []= [];
  constructor() { }

  ngOnInit() {
    this.numberEstrellas = 5;
    for (let i = 0; i < this.numberEstrellas; i ++) {
     this.arreglos.push(i);
    }
  }

}
