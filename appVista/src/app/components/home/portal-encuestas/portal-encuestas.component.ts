import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { MzModalService } from 'ng2-materialize';
import { VerEncuestaComponent } from '../ver-encuesta/ver-encuesta.component';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { EncuestasService } from '../../../services/encuestas.service';
import { ComentariosService } from '../../../services/comentarios.service';
import { DiscusionesService } from '../../../services/discusiones.service';


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
              private modal: MzModalService,
              private router: Router) { }

  ngOnInit() {
    this.searchField = new FormControl;
    this.searchField.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .do((value) => {
          if (this.textoBusqueda === '' ) {
            this.finished = false;
          }
        })
        .switchMap(encuestas => this.servicioEncuesta.loadEncuestasByCategory(encuestas, 1))
        .subscribe((res: Response) => {
          this.encuestas = res['encuestas'];
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
    this.servicioEncuesta.setIDEncuesta(idEncuesta);
    this.modal.open(VerEncuestaComponent);
  }

  nextPage(pagina) {
    this.paginaActual = pagina;
    this.servicioEncuesta.loadListaEncuestas(pagina)
                         .take(20)
                         .subscribe((res) => {
                            this.encuestas = res['encuestas'];
                         });
  }

  next () {
    this.paginaActual = this.paginaActual + 1;
    this.servicioEncuesta.loadListaEncuestas(this.paginaActual)
        .take(20)
        .subscribe((res) => {
            this.encuestas = res['encuestas'];
        });
  }

  crearDiscusion (idEncuestas) {
    console.log(idEncuestas);
  }

  verListaDiscusiones(idEncuesta) {
    this.discusionesServicio.setTipoDiscusion('encuesta');
    this.discusionesServicio.setIdCuerpoDiscusion(idEncuesta);
    this.router.navigate(['/home', 'listadoDiscusiones']);
  }
  verListadoComentarios(idEncuesta) {
    this.servicioComentario.setidCategoria(idEncuesta);
    this.servicioComentario.setTipoComentario('encuesta');
    this.router.navigate(['/home', 'verComentarios']);
  }

}
