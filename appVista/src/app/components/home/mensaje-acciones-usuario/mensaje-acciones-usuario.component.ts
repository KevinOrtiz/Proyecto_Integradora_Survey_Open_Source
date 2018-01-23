import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AccionesUsuarioService } from '../../../services/acciones-usuario.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-mensaje-acciones-usuario',
  templateUrl: './mensaje-acciones-usuario.component.html',
  styleUrls: ['./mensaje-acciones-usuario.component.scss']
})
export class MensajeAccionesUsuarioComponent implements OnInit, AfterViewInit {
  acciones: String;
  subscripcion$: Subscription;
  constructor(private servicioAcciones: AccionesUsuarioService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      Promise.resolve(null).then(() => {
        this.subscripcion$ = this.servicioAcciones.getObjectMensaje().subscribe((data) => {
          this.acciones = data;
        }, (err) => {
          console.log(err);
        });
      });
    });
  }

}
