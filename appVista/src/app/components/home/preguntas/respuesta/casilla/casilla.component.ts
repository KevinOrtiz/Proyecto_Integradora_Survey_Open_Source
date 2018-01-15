import { Component, OnInit, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import { RespuestasService } from '../../../../../services/respuestas.service';
import {MatSnackBar} from '@angular/material';
import { SnackBarMensajesComponent } from '../../snack-bar-mensajes/snack-bar-mensajes.component';
import { SnackBarMensajesActualizadosComponent } from '../../snack-bar-mensajes-actualizados/snack-bar-mensajes-actualizados.component';
import { PreguntasService } from '../../../../../services/preguntas.service';



@Component({
  selector: 'app-casilla',
  templateUrl: './casilla.component.html',
  styleUrls: ['./casilla.component.scss']
})
export class CasillaComponent implements OnInit, AfterViewInit {
  @ViewChild('valorInputRespuestaCasilla') input: ElementRef;
  private estaGuardado = false;
  private oldValue = '';
  constructor(private respuestas: RespuestasService,
              private snackBar: MatSnackBar, private preguntaServicio: PreguntasService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log(' hola esta es una prueba' + this.input.nativeElement.value);
  }
  addRespuesta() {
    if (this.estaGuardado === false) {
      console.log(this.input.nativeElement.value);
      this.respuestas.setListasRespuestasCasillas(this.input.nativeElement.value);
      console.log(this.respuestas.getListaRespuestasCasillas());
      this.snackBar.openFromComponent(SnackBarMensajesComponent, { duration: 500});
      this.estaGuardado = true;
    }else {
      this.respuestas.updateValueListaRespuestasCasillas(this.oldValue, this.input.nativeElement.value);
      console.log(this.respuestas.getListaRespuestasCasillas());
      this.snackBar.openFromComponent(SnackBarMensajesActualizadosComponent, { duration: 500});

    }
    this.preguntaServicio.setEtiquetas('casilla');
    this.oldValue = this.input.nativeElement.value;
  }

}
