import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {LoginService} from '../../../services/login.service';
import {NotificacionesService} from '../../../services/notificaciones.service';

@Component({
  selector: 'app-notificacion-mensajes',
  templateUrl: './notificacion-mensajes.component.html',
  styleUrls: ['./notificacion-mensajes.component.scss']
})
export class NotificacionMensajesComponent implements OnInit {
  listaMensajes = [];
  subscripcionIDUsuario: Subscription;
  constructor(private servicioNotificacion: NotificacionesService, private servicioLogin: LoginService) {
    this.subscripcionIDUsuario = this.servicioLogin.getIDUsuario().subscribe((res) => {
      let idUsuario = '';
      if (res) {
        idUsuario = res;
      } else {
        idUsuario = sessionStorage.getItem('id');
      }
      this.servicioNotificacion.loadListaMensajes(idUsuario).subscribe((respuesta) => {
        this.listaMensajes = respuesta;
      });
    });
  }

  ngOnInit() {
  }

}
