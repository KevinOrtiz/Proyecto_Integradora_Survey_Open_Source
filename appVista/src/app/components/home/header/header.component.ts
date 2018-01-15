import { Component, OnInit, Input} from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nombre: string;
  apellido: string;
  imagen: string;
  isFullscreen = false;
  notificacionMensajesUsuarios;
  notificacionAccionesUsuarios;

  constructor() {
    this.notificacionAccionesUsuarios = 30;
    this.notificacionMensajesUsuarios = 20;
  }

  ngOnInit() {
    this.nombre = sessionStorage.getItem('nombre');
    this.apellido = sessionStorage.getItem('apellido');
    this.imagen = sessionStorage.getItem('imagen');
  }
  toggleFullscreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }

}
