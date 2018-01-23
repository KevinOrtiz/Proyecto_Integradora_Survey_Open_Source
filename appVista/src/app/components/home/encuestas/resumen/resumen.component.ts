import { Component, OnInit } from '@angular/core';
import { EncuestasService } from '../../../../services/encuestas.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {
  tituloEncuesta: string;
  descripcionEncuesta: string;
  numeroPreguntas: number;
  etiquetas = [];
  listaPreguntasValidas: Object [] = [];
  constructor(private servicioEncuesta: EncuestasService) {
    this.tituloEncuesta = servicioEncuesta.getTitulo();
    this.descripcionEncuesta = servicioEncuesta.getDescripcion();
    this.numeroPreguntas = servicioEncuesta.getPreguntas().length;
    this.etiquetas = servicioEncuesta.getTagEncuesta();
    this.listaPreguntasValidas = servicioEncuesta.getPreguntas();
  }

  ngOnInit() {
  }

}
