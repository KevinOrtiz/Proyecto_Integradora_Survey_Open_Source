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
import {NotificacionesService} from '../../../services/notificaciones.service';
import {PreguntasService} from '../../../services/preguntas.service';
import {CrearDiscusionComponent} from '../crear-discusion/crear-discusion.component';
import {ValidarPreguntasComponent} from '../validar-preguntas/validar-preguntas.component';
import {VerPreguntaComponent} from '../ver-pregunta/ver-pregunta.component';

@Component({
  selector: 'app-portal-preguntas',
  templateUrl: './portal-preguntas.component.html',
  styleUrls: ['./portal-preguntas.component.scss']
})
export class PortalPreguntasComponent implements OnInit {
  isOpen: boolean;
  preguntas: any[] = [];
  finished = false;
  esSearch = false;
  textoBusqueda = '';
  rol = sessionStorage.getItem('rol');
  searchField: FormControl;
  @ViewChild('input')
  input: ElementRef;
  paginaActual = 1;
  constructor(private servicioPregunta: PreguntasService,
              private dialog: MatDialog, private comentarios: ComentariosService,
              private router: Router, private discusiones: DiscusionesService,
              public renderer: Renderer, private servicioNotificacion: NotificacionesService) {
  }

  ngOnInit() {
    this.searchField = new FormControl;
    this.searchField.valueChanges
      .debounceTime(100)
      .distinctUntilChanged()
      .do((value) => {
        if (this.textoBusqueda === '') {
          this.esSearch = false;
          this.finished = false;
        }else {
          this.esSearch = true;
        }
      })
      .switchMap(respuestas => this.servicioPregunta.loadPreguntasByCategory(respuestas, 1))
      .subscribe((res: Response) => {
        this.preguntas = res['preguntas'];
        this.finished = true;
      });
  }

  open() {
    this.isOpen = true;

    setTimeout(() => {
      this.renderer.invokeElementMethod(
        this.input.nativeElement, 'focus', []);
    }, 100);

  }
  close() {
    this.isOpen = false;
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

  nextPage(pagina) {
    this.paginaActual = pagina;
    this.servicioPregunta.loadListaPregunta(pagina)
        .take(20)
        .subscribe((res) => {
            this.preguntas = res['preguntas'];
        });
  }
  next() {
    this.paginaActual = this.paginaActual + 1;
    this.servicioPregunta.loadListaPregunta(this.paginaActual)
        .take(20)
        .subscribe((res) => {
            this.preguntas = res['preguntas'];
        });
  }
  crearDiscusion(idPregunta, idUsuario) {
    this.servicioNotificacion.setIDreceptor(idUsuario);
    this.discusiones.setTipoDiscusion('pregunta');
    this.discusiones.setIdCuerpoDiscusion(idPregunta);
    const dialogoDiscusion = this.dialog.open(CrearDiscusionComponent, {
      width: '960px',
      height: '683px'
    });
    dialogoDiscusion.afterClosed().subscribe(res => console.log(res));
  }
  validarPregunta(idPregunta, idUsuario) {
    this.servicioNotificacion.setIDreceptor(idUsuario);
    this.discusiones.setTipoDiscusion('pregunta');
    this.discusiones.setIdCuerpoDiscusion(idPregunta);
    const validarPregunta = this.dialog.open(ValidarPreguntasComponent, {
      width: '960px',
      height: '683px'
    });
    validarPregunta.afterClosed().subscribe(res => console.log(res));

  }

  verListaDiscusiones(idPregunta, idUsuario) {
    this.discusiones.setTipoDiscusion('pregunta');
    this.discusiones.setIdCuerpoDiscusion(idPregunta);
    this.router.navigate(['/home', 'listadoDiscusiones']);
  }

  /**
   * Aqui se abrira un modal donde se pasara el idPregunta y el IdComentario
   * @param idPregunta
   */
  verListadoComentarios(idPregunta, idUsuario) {
    this.servicioNotificacion.setIDreceptor(idUsuario);
    this.comentarios.setidCategoria(idPregunta);
    this.comentarios.setTipoComentario('pregunta');
    this.router.navigate(['/home', 'verComentarios']);
   }


}
