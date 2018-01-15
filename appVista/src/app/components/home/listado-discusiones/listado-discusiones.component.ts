import { Component, OnInit, ViewChild } from '@angular/core';
import { DiscusionesService } from '../../../services/discusiones.service';
import { ComentariosService } from '../../../services/comentarios.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-listado-discusiones',
  templateUrl: './listado-discusiones.component.html',
  styleUrls: ['./listado-discusiones.component.scss']
})
export class ListadoDiscusionesComponent implements OnInit {
  listadoDiscusiones: Object[];
  idUserActive = sessionStorage.getItem('id');
  idDiscusion ;
  @ViewChild('cerrarDiscusion') private cerrarDiscusion: SwalComponent;
  @ViewChild('actualizacionCorrecta') private actualizacionCorrecta: SwalComponent;
  @ViewChild('actualizacionErronea') private actualizacionErronea: SwalComponent;
  constructor(private discusion: DiscusionesService,
    private comentarios: ComentariosService,
    private router: Router) {
    this.discusion.loadListaDiscusiones().subscribe((res) => {
      this.listadoDiscusiones = res;
    });
  }

  ngOnInit() {
  }


  verListadoComentarios(idDiscusion) {
    this.comentarios.setidCategoria(idDiscusion);
    this.comentarios.setTipoComentario('discusionPregunta');
    this.router.navigate(['/home', 'verComentarios']);
  }
  showPopUp(id) {
    this.idDiscusion = id;
    this.cerrarDiscusion.show();
  }
  cerrarIssue() {
    console.log(this.idDiscusion);
    this.discusion.setIdCuerpoDiscusion(this.idDiscusion);
    this.discusion.cerrarDiscusion().subscribe((res) => {
      if (res['status'] === 200) {
        this.actualizacionCorrecta.show();
        this.mostrarDiscusionPreguntaActualizada(this.idDiscusion, res['fecha_cierre']);
      }else {
        this.actualizacionErronea.show();
      }
    });
  }

  mostrarDiscusionPreguntaActualizada(id, fecha_cierre) {
    this.listadoDiscusiones.filter(discusion => discusion['_id'] === id).map((discusion) => {
      discusion['fecha_cierre'] = fecha_cierre;
    });
  }
}
