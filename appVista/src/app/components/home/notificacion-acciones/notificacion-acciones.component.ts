import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {LoginService} from '../../../services/login.service';
import {NotificacionesService} from '../../../services/notificaciones.service';

@Component({
  selector: 'app-notificacion-acciones',
  templateUrl: './notificacion-acciones.component.html',
  styleUrls: ['./notificacion-acciones.component.scss']
})
export class NotificacionAccionesComponent implements OnInit {
  listaNotificacion = [];
  subscripcionIDUsuario: Subscription;
  constructor(private servicioNotificacion: NotificacionesService, private servicioLogin: LoginService) {
    this.subscripcionIDUsuario = this.servicioLogin.getIDUsuario().subscribe((res) => {
      let idUsuario = '';
      if (res) {
        idUsuario = res;
      } else {
        idUsuario = sessionStorage.getItem('id');
      }
      this.servicioNotificacion.loadListaAcciones(idUsuario).subscribe((respuesta) => {
        this.listaNotificacion = respuesta;
      });
    });
  }

  ngOnInit() {
  }

}
