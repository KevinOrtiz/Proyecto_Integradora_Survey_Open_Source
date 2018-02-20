import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from "@toverux/ngx-sweetalert2";
import {Observable} from 'rxjs/Observable';
import {DiscusionesService} from "../../../services/discusiones.service";
import {EncuestasService} from '../../../services/encuestas.service';

@Component({
  selector: 'app-listado-discusiones-encuesta',
  templateUrl: './listado-discusiones-encuesta.component.html',
  styleUrls: ['./listado-discusiones-encuesta.component.scss']
})
export class ListadoDiscusionesEncuestaComponent implements OnInit {
  @ViewChild('exito') exito: SwalComponent;
  @ViewChild('error') error: SwalComponent;
  listaDiscusiones$: Observable<Object[]>;
  constructor(private servicioEncuesta: EncuestasService, private servicioDiscusion: DiscusionesService) { }

  ngOnInit() {
    this.listaDiscusiones$ = this.servicioEncuesta.loadListaMisDiscusiones();
  }
  
  rechazarDiscusion(id){
    this.servicioDiscusion.actualizarEstadoDiscusionEncuesta(id, 'rechazado').subscribe(res => {
      if (res['status'] === 200) {
        this.exito.show();
      
      }else if (res['status'] === 500) {
        this.error.show();
      
      }
    })
  
  }
  
  aceptarDiscusion(id) {
    this.servicioDiscusion.actualizarEstadoDiscusionEncuesta(id, 'aceptado').subscribe(res => {
        if (res['status'] === 200) {
          this.exito.show();
        
        }else if (res['status'] === 500) {
          this.error.show();
        
        }
    })
  
  }

}
