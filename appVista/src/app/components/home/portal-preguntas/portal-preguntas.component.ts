import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../../../services/preguntas.service';
import { MatDialog } from '@angular/material';
import { VerPreguntaComponent } from '../ver-pregunta/ver-pregunta.component';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { ComentariosService } from '../../../services/comentarios.service';
import { VerComentariosComponent } from '../ver-comentarios/ver-comentarios.component';
import { Router } from '@angular/router';
import { DiscusionesService } from '../../../services/discusiones.service';
import { CrearDiscusionComponent } from '../crear-discusion/crear-discusion.component';

@Component({
  selector: 'app-portal-preguntas',
  templateUrl: './portal-preguntas.component.html',
  styleUrls: ['./portal-preguntas.component.css']
})
export class PortalPreguntasComponent implements OnInit {
  preguntas: any[] = [];
  finished = false;
  page = 1;
  esSearch = false;
  textoBusqueda = '';
  searchField: FormControl;
  constructor(private servicioPregunta: PreguntasService,
              private dialog: MatDialog, private comentarios: ComentariosService,
              private router: Router, private discusiones: DiscusionesService) {
  }

  ngOnInit() {
    this.searchField = new FormControl;
    this.searchField.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .do((value) => {
        if (this.textoBusqueda === '') {
          this.esSearch = false;
          this.finished = false;
        }else {
          this.esSearch = true;
        }
        this.page = 1;
      })
      .switchMap(respuestas => this.servicioPregunta.loadPreguntasByCategory(respuestas, this.page))
      .subscribe((res: Response) => {
        console.log(res);
        this.preguntas = res['preguntas'];
      });
  }
  verPregunta(idPregunta) {
    console.log(idPregunta);
    this.servicioPregunta.setIdPregunta(idPregunta);
    this.servicioPregunta.setFlagDatosServidor();
    const dialogo1 = this.dialog.open(VerPreguntaComponent, {
      width: '800px'
    });
    dialogo1.afterClosed().subscribe(result => {
      console.log('dialogo cerrado');
    });
  }


  onScroll() {
    console.log('entro');
    if (!this.esSearch) {
      this.servicioPregunta.loadListaPregunta(this.page)
        .take(20)
        .subscribe((res) => {
          if (res['paginas'] === this.page) {
            this.finished = true;
          } else if (res['paginas'] !== this.page) {
            this.preguntas.push.apply(this.preguntas, res['preguntas']);
            this.page++;
            console.log(this.preguntas);
          }
        });

    }else {
      this.servicioPregunta.loadPreguntasByCategory(this.textoBusqueda, this.page)
                            .take(10)
                            .subscribe((res) => {
                              if (res['paginas'] === this.page) {
                                console.log(res['paginas']);
                                this.finished = true;
                              } else if (res['paginas'] !== this.page) {
                                this.page ++;
                                this.preguntas.push.apply(this.preguntas, res['preguntas']);
                                console.log(this.preguntas);
                              }
                            });
    }
  }

  crearDiscusion(idPregunta) {
    this.discusiones.setTipoDiscusion('pregunta');
    this.discusiones.setIdCuerpoDiscusion(idPregunta);
    const dialogoDiscusion = this.dialog.open(CrearDiscusionComponent, {
      width: '960px',
      height: '683px'
    });
    dialogoDiscusion.afterClosed().subscribe(res => console.log(res));
  }

  verListaDiscusiones(idPregunta) {
    console.log(idPregunta);
    this.discusiones.setTipoDiscusion('pregunta');
    this.discusiones.setIdCuerpoDiscusion(idPregunta);
    this.router.navigate(['/home', 'listadoDiscusiones']);
  }

  /**
   * Aqui se abrira un modal donde se pasara el idPregunta y el IdComentario
   * @param idPregunta
   */
  verListadoComentarios(idPregunta) {
    this.comentarios.setidCategoria(idPregunta);
    this.comentarios.setTipoComentario('pregunta');
    this.router.navigate(['/home', 'verComentarios']);
   }


}
