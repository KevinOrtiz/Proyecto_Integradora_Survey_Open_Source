import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EncuestasService } from '../../../services/encuestas.service';


@Component({
  selector: 'app-ver-encuesta',
  templateUrl: './ver-encuesta.component.html',
  styleUrls: ['./ver-encuesta.component.scss']
})
export class VerEncuestaComponent implements OnInit {
  encuesta: Object;
  cantidadPreguntas = 0;
  constructor(private servicioEncuesta: EncuestasService) {
    this.servicioEncuesta.loadEncuesta().subscribe((res) => {
      console.log(res);
      this.encuesta = res;
      this.cantidadPreguntas = res.preguntas.length;
    });
   }

  ngOnInit() {
  }

}
