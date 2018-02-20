import {Component, ElementRef, OnInit, Renderer, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import {ComentariosService} from '../../../services/comentarios.service';
import {DiscusionesService} from '../../../services/discusiones.service';
import {EncuestasService} from '../../../services/encuestas.service';
import {NotificacionesService} from '../../../services/notificaciones.service';
import {CrearDiscusionComponent} from "../crear-discusion/crear-discusion.component";
import {VerEncuestaComponent} from '../ver-encuesta/ver-encuesta.component';


@Component({
  selector: 'app-portal-encuestas',
  templateUrl: './portal-encuestas.component.html',
  styleUrls: ['./portal-encuestas.component.scss']
})
export class PortalEncuestasComponent implements OnInit {
  isOpen: boolean;
  encuestas: Object [] = [];
  finished = false;
  textoBusqueda = '';
  searchField: FormControl;
  @ViewChild('input') input: ElementRef;
  paginaActual = 1;
  constructor(private servicioEncuesta: EncuestasService,
              private servicioComentario: ComentariosService,
              private discusionesServicio: DiscusionesService,
              private renderer: Renderer,
              private modal: MatDialog,
              private router: Router,
              private servicioNotificacion: NotificacionesService) { }

  ngOnInit() {
    this.searchField = new FormControl;
    this.searchField.valueChanges
        .debounceTime(100)
        .distinctUntilChanged()
        .do((value) => {
          if (this.textoBusqueda === '' ) {
            this.finished = false;
          }
        })
        .switchMap(encuestas => this.servicioEncuesta.loadEncuestasByCategory(encuestas, 1))
        .subscribe((res) => {
          this.encuestas = res;
          this.finished = true;
        });
  }

  open() {
    this.isOpen = true;
    setTimeout(() => {
      this.renderer.invokeElementMethod(
        this.input.nativeElement, 'focus', []
      );
    }, 100);
  }

  close () {
    this.isOpen = false;
  }
  verEncuesta (idEncuesta) {
    console.log('entre');
    console.log(idEncuesta);
    this.servicioEncuesta.setIDEncuesta(idEncuesta);
    this.modal.open(VerEncuestaComponent , {
      width: '900px'
    });
  }

  nextPage(pagina) {
    this.paginaActual = pagina;
    this.servicioEncuesta.loadListaEncuestas(pagina)
                         .take(20)
                         .subscribe((res) => {
                            this.encuestas = res;
                         });
  }

  next () {
    this.paginaActual = this.paginaActual + 1;
    this.servicioEncuesta.loadListaEncuestas(this.paginaActual)
        .take(20)
        .subscribe((res) => {
            this.encuestas = res;
        });
  }

  crearDiscusion (idEncuestas, idUsuario) {
    this.servicioNotificacion.setIDreceptor(idUsuario);
    this.discusionesServicio.setTipoDiscusion('encuesta');
    this.discusionesServicio.setIdCuerpoDiscusion(idEncuestas);
    const dialogoDiscusion = this.modal.open(CrearDiscusionComponent,{
      width: '960px',
      height: '683px'
    });
    dialogoDiscusion.afterClosed().subscribe(res => console.log(res));
    console.log(idEncuestas);
  }

  verListaDiscusiones(idEncuesta, idUsuario) {
    this.servicioNotificacion.setIDreceptor(idUsuario);
    this.discusionesServicio.setTipoDiscusion('encuesta');
    this.discusionesServicio.setIdCuerpoDiscusion(idEncuesta);
    this.router.navigate(['/home', 'listadoDiscusiones']);
  }
  verListadoComentarios(idEncuesta, idUsuario) {
    this.servicioNotificacion.setIDreceptor(idUsuario);
    this.servicioComentario.setidCategoria(idEncuesta);
    this.servicioComentario.setTipoComentario('encuesta');
    this.router.navigate(['/home', 'verComentarios']);
  }

}
