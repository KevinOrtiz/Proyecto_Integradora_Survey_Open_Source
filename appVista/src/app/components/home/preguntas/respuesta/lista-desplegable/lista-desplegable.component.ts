import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RespuestasService } from '../../../../../services/respuestas.service';
import {MatSnackBar} from '@angular/material';
import { SnackBarMensajesComponent } from '../../snack-bar-mensajes/snack-bar-mensajes.component';
import { SnackBarMensajesActualizadosComponent } from '../../snack-bar-mensajes-actualizados/snack-bar-mensajes-actualizados.component';


@Component({
  selector: 'app-lista-desplegable',
  templateUrl: './lista-desplegable.component.html',
  styleUrls: ['./lista-desplegable.component.css']
})
export class ListaDesplegableComponent implements OnInit, AfterViewInit {
  @ViewChild('valorInputListaDesplegable') input: ElementRef;
  private estaGuardado = false;
  private oldValue = '';
  constructor(private respuestas: RespuestasService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log(' hola esta es una prueba' + this.input.nativeElement.value);
  }
  addRespuesta() {
    if (this.estaGuardado === false) {
      console.log(this.input.nativeElement.value);
      this.respuestas.setListaDesplegable(this.input.nativeElement.value);
      console.log(this.respuestas.getListaDesplegable());
      this.snackBar.openFromComponent(SnackBarMensajesComponent, { duration: 500});
      this.estaGuardado = true;
    }else {
      this.respuestas.updateValueListaDesplegable(this.oldValue, this.input.nativeElement.value);
      console.log(this.respuestas.getListaDesplegable());
      this.snackBar.openFromComponent(SnackBarMensajesActualizadosComponent, { duration: 500});

    }
    this.oldValue = this.input.nativeElement.value;
  }


}
