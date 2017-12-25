import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RespuestasService } from '../../../../../services/respuestas.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { PreguntasService } from '../../../../../services/preguntas.service';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css']
})
export class DescripcionComponent implements OnInit, AfterViewInit {
  constructor(private respuestas: RespuestasService,
              private preguntaServicio: PreguntasService) { }

  ngOnInit() {
    this.respuestas.setDescripcion();
    this.preguntaServicio.setEtiquetas('libre');
    this.preguntaServicio.setRespuesta(this.respuestas.getDescripcion());
  }
  ngAfterViewInit() {

  }

}
