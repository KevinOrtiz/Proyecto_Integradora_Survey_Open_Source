import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../../services/notificaciones.service';

@Component({
  selector: 'app-notificacion-mensajes',
  templateUrl: './notificacion-mensajes.component.html',
  styleUrls: ['./notificacion-mensajes.component.scss']
})
export class NotificacionMensajesComponent implements OnInit {
  listaMensajes = [];
  constructor(private servicioNotificacion: NotificacionesService) {
    this.servicioNotificacion.loadListaMensajes().subscribe((res) => {
      console.log(res);
      this.listaMensajes = res;
    });
  }

  ngOnInit() {
  }

}
