import { Component, OnInit } from '@angular/core';
import { RespuestasService } from '../../../../../services/respuestas.service';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.css']
})
export class PuntajeComponent implements OnInit {
   numberEstrellas ;
   arreglos: number []= [];
  constructor(private respuestas: RespuestasService) { }

  ngOnInit() {
    this.numberEstrellas = 5;
    for (let i = 0; i < this.numberEstrellas; i ++) {
     this.arreglos.push(i);
    }
    this.respuestas.setPuntaje(5);
  }

}
