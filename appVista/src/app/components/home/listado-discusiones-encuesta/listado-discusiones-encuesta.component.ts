import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EncuestasService } from '../../../services/encuestas.service';


@Component({
  selector: 'app-listado-discusiones-encuesta',
  templateUrl: './listado-discusiones-encuesta.component.html',
  styleUrls: ['./listado-discusiones-encuesta.component.scss']
})
export class ListadoDiscusionesEncuestaComponent implements OnInit {
  listaDiscusiones$: Observable<Object[]>;
  constructor(private servicioEncuesta: EncuestasService) { }

  ngOnInit() {
    this.listaDiscusiones$ = this.servicioEncuesta.loadListaMisDiscusiones();
  }

}
