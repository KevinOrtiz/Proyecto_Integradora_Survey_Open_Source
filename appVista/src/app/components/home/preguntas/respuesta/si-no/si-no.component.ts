import { Component, OnInit } from '@angular/core';
import { RespuestasService } from '../../../../../services/respuestas.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { PreguntasService } from '../../../../../services/preguntas.service';


@Component({
  selector: 'app-si-no',
  templateUrl: './si-no.component.html',
  styleUrls: ['./si-no.component.scss']
})
export class SiNoComponent implements OnInit, AfterViewInit {

  constructor(private respuestas: RespuestasService, private preguntaServicio: PreguntasService) { }

  ngOnInit() {
    this.preguntaServicio.setEtiquetas('si/no');
    this.preguntaServicio.setRespuesta(this.respuestas.getSi_No());
  }
  ngAfterViewInit() {

  }

}
