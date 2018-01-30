import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../../services/notificaciones.service';

@Component({
  selector: 'app-notificacion-acciones',
  templateUrl: './notificacion-acciones.component.html',
  styleUrls: ['./notificacion-acciones.component.scss']
})
export class NotificacionAccionesComponent implements OnInit {
  listaNotificacion = [];
  constructor(private servicioNotificacion: NotificacionesService) {
    this.servicioNotificacion.loadListaAcciones().subscribe((res) => {
      console.log(res);
      this.listaNotificacion = res;
    });
   }

  ngOnInit() {
  }

}
