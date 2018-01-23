import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';
import { EncuestasService } from '../../../services/encuestas.service';


@Component({
  selector: 'app-ver-encuesta',
  templateUrl: './ver-encuesta.component.html',
  styleUrls: ['./ver-encuesta.component.scss']
})
export class VerEncuestaComponent implements OnInit, MzBaseModal, AfterViewInit {
  modalComponent: MzModalComponent;
  encuesta: Object;
  cantidadPreguntas = 0;
  constructor(private servicioEncuesta: EncuestasService) {
    this.servicioEncuesta.loadEncuesta().subscribe((res) => {
      this.encuesta = res;
      this.cantidadPreguntas = res.preguntas.length;
    });
   }

  ngOnInit() {
  }

  ngAfterViewInit() {}


}
