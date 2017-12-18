import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RespuestasService } from '../../../../../services/respuestas.service';
import {MatSnackBar} from '@angular/material';
import { SnackBarMensajesComponent } from '../../snack-bar-mensajes/snack-bar-mensajes.component';
import { SnackBarMensajesActualizadosComponent } from '../../snack-bar-mensajes-actualizados/snack-bar-mensajes-actualizados.component';



@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit, AfterViewInit {
  @ViewChild('valorInputRespuestaRadio') input: ElementRef;
  private estaGuardado = false;
  private oldValue = '';
  constructor(private respuestas: RespuestasService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log(' hola esta es una prueba' + this.input.nativeElement.value);
  }
  addRespuesta () {
    if (this.estaGuardado === false) {
      this.respuestas.setListasRespuestasRadio(this.input.nativeElement.value);
      console.log(this.respuestas.getListaRespuestasRadios());
      this.snackBar.openFromComponent(SnackBarMensajesComponent, { duration: 500});
      this.estaGuardado = true;
    }else {
      this.respuestas.updateValueListaRespuestasRadio(this.oldValue, this.input.nativeElement.value);
      console.log(this.respuestas.getListaRespuestasRadios());
      this.snackBar.openFromComponent(SnackBarMensajesActualizadosComponent, { duration: 500});

    }
    this.oldValue = this.input.nativeElement.value;
  }
}
