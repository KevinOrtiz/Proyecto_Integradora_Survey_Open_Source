import { Component, OnInit } from '@angular/core';
import { RespuestasService } from '../../../../../services/respuestas.service';
import { PreguntasService } from '../../../../../services/preguntas.service';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.scss']
})
export class PuntajeComponent implements OnInit {
   numberEstrellas ;
   arreglos: number []= [];
  constructor(private respuestas: RespuestasService, private preguntaServicio: PreguntasService) { }

  ngOnInit() {
    this.numberEstrellas = 5;
    for (let i = 0; i < this.numberEstrellas; i ++) {
     this.arreglos.push(i);
    }
    this.respuestas.setPuntaje(5);
    this.preguntaServicio.setEtiquetas('puntaje');
    this.preguntaServicio.setRespuesta(this.respuestas.getPuntaje());
  }

}
