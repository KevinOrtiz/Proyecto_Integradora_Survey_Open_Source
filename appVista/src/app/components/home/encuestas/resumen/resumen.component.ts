import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EncuestasService } from '../../../../services/encuestas.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit, AfterViewInit {
  tituloEncuesta = '';
  descripcionEncuesta = '';
  numeroPreguntas = 0;
  etiquetas = [];
  url = '';
  subscripcionTitulo: Subscription;
  subscripcionDescripcion: Subscription;
  subscripcionUrl: Subscription;
  listaPreguntasValidas: Object [] = [];
  constructor(private servicioEncuesta: EncuestasService) {
    this.subscripcionTitulo = this.servicioEncuesta.gettitulo$().subscribe((res) => {
      this.tituloEncuesta = res;
    });
    this.subscripcionDescripcion = this.servicioEncuesta.getdescripcion$().subscribe((res) => {
      this.descripcionEncuesta = res;
    });
    this.subscripcionUrl = this.servicioEncuesta.geturl$().subscribe((res) => {
      this.url = res;
    });
  }

  ngOnInit() {
    this.numeroPreguntas = this.servicioEncuesta.getPreguntas().length;
    this.etiquetas = this.servicioEncuesta.getTagEncuesta();
    this.listaPreguntasValidas = this.servicioEncuesta.getPreguntas();
  }
  ngAfterViewInit () {
  }

}
