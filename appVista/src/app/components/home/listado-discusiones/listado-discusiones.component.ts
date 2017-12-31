import { Component, OnInit } from '@angular/core';
import { DiscusionesService } from '../../../services/discusiones.service';
import { ComentariosService } from '../../../services/comentarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-discusiones',
  templateUrl: './listado-discusiones.component.html',
  styleUrls: ['./listado-discusiones.component.css']
})
export class ListadoDiscusionesComponent implements OnInit {
  listadoDiscusiones: any[] = [];
  finished = false;
  page = 0;
  constructor(private discusion: DiscusionesService,
    private comentarios: ComentariosService,
    private router: Router) {
    this.discusion.loadListaDiscusiones(this.page)
      .subscribe((res) => {
        console.log(res);
        this.listadoDiscusiones = res['discusiones'];
      });
  }

  ngOnInit() {
  }

  onScroll() {
    if (!this.finished) {
      this.page++;
      this.discusion.loadListaDiscusiones(this.page)
        .take(20)
        .subscribe((res) => {
          if (res['discusiones']) {
            this.listadoDiscusiones.push.apply(this.listadoDiscusiones, res['discusiones']);
          } else {
            this.finished = true;
          }
        });
    }
  }

  verListadoComentarios(idDiscusion) {
    this.comentarios.setidCategoria(idDiscusion);
    this.comentarios.setTipoComentario('discusionPregunta');
    this.router.navigate(['/home', 'verComentarios']);
  }

}
