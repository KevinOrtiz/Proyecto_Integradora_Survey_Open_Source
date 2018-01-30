import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as screenfull from 'screenfull';
import { NotificacionesService } from '../../../services/notificaciones.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('audioMensaje') audioMensajeRef: ElementRef;
  @ViewChild('audioAccion') audioAccionRef: ElementRef;
  nombre: string;
  apellido: string;
  imagen: string;
  isFullscreen = false;
  listaMensajes = [];
  listaAcciones = [];
  notificacionMensajesUsuarios = 0;
  notificacionAccionesUsuarios = 0;

  constructor(private servicioNotificacion: NotificacionesService) {
    this.servicioNotificacion.connect();
    this.servicioNotificacion.getNumeroAcciones().subscribe(res => this.notificacionAccionesUsuarios = res);
    this.servicioNotificacion.getNumeroMensajes().subscribe(res => this.notificacionMensajesUsuarios = res);
    this.servicioNotificacion.loadFiveAcciones().subscribe((res) => {
        this.listaAcciones = res;
    });
    this.servicioNotificacion.loadFiveMensajes().subscribe((res) => {
        this.listaMensajes = res;
    });
  }

  ngOnInit() {
    this.nombre = sessionStorage.getItem('nombre');
    this.apellido = sessionStorage.getItem('apellido');
    this.imagen = sessionStorage.getItem('imagen');
    this.servicioNotificacion.recibirAccionesUsuarios().subscribe((res) => {
      if (res['tipo'] === 'comentario') {
          this.listaMensajes.push(res);
        this.notificacionMensajesUsuarios = this.listaMensajes.length;
        if (this.notificacionMensajesUsuarios > 0) {
            this.audioMensajeRef.nativeElement.play();
        }
      } else {
        this.listaAcciones.push(res);
        this.notificacionAccionesUsuarios = this.listaAcciones.length;
        if (this.notificacionAccionesUsuarios > 0) {
            this.audioAccionRef.nativeElement.play();
        }
      }
    });
  }
  toggleFullscreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }

}
