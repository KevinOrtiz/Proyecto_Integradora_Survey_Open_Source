import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RespuestasService } from '../../../../../services/respuestas.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css']
})
export class DescripcionComponent implements OnInit, AfterViewInit {
  constructor(private respuestas: RespuestasService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.respuestas.setDescripcion('respuesta es libre');
  }

}
