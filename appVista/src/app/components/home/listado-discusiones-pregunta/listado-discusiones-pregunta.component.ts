import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PreguntasService } from '../../../services/preguntas.service';

@Component({
  selector: 'app-listado-discusiones-pregunta',
  templateUrl: './listado-discusiones-pregunta.component.html',
  styleUrls: ['./listado-discusiones-pregunta.component.scss']
})
export class ListadoDiscusionesPreguntaComponent implements OnInit {
  listaDiscusiones$: Observable<Object[]>;
  constructor(private servicioPregunta: PreguntasService) {
  }

  ngOnInit() {
    this.listaDiscusiones$ = this.servicioPregunta.loadDiscusionesByPreguntas();
  }

}
