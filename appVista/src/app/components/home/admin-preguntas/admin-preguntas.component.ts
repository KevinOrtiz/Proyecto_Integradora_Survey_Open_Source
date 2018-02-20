import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import {ComentariosService} from '../../../services/comentarios.service';
import {DiscusionesService} from '../../../services/discusiones.service';
import {PreguntasService} from '../../../services/preguntas.service';
import {ListadoDiscusionesPreguntaComponent} from '../listado-discusiones-pregunta/listado-discusiones-pregunta.component';
import {VerPreguntaComponent} from '../ver-pregunta/ver-pregunta.component';


@Component({
  selector: 'app-admin-preguntas',
  templateUrl: './admin-preguntas.component.html',
  styleUrls: ['./admin-preguntas.component.scss']
})
export class AdminPreguntasComponent implements OnInit {
  
  numberPages = 1;
  pageActual = 1;
  listaPreguntas = [];
  searchField: FormControl;
  BusquedaFinalizada = false;
  textoBusqueda = '';
  @ViewChild('input') input: ElementRef;
  @ViewChild('eliminado') private eliminado: SwalComponent;
  @ViewChild('error') private error: SwalComponent;
  constructor(private servicioPregunta: PreguntasService,
              private servicioDiscusion: DiscusionesService,
              private dialog: MatDialog, private servicioComentario: ComentariosService,
              private router: Router) {
              
              }

  ngOnInit() {
    this.searchField = new FormControl;
    this.searchField.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(etiqueta => this.servicioPregunta.loadListaMisPreguntas(etiqueta,1))
      .subscribe((res) =>{
          this.listaPreguntas = res['listaPreguntas'];
          this.numberPages = res['pages'];
          this.BusquedaFinalizada = true;
      });
      
  }
  
  next(){
    this.pageActual = this.pageActual + 1;
    this.servicioPregunta.loadListaMisPreguntas(this.textoBusqueda,this.pageActual)
      .subscribe((res) =>{
        this.listaPreguntas = res['listaPreguntas'];
        this.numberPages = res['paginas'];
      });
    
  }
  
  previous() {
    if (this.pageActual > 1){
      this.pageActual = this.pageActual - 1;
      this.servicioPregunta.loadListaMisPreguntas(this.textoBusqueda, this.pageActual)
        .subscribe((res)=>{
          this.listaPreguntas = res['listaPreguntas'];
          this.numberPages = res['paginas'];
        });
    }
  }

  verPregunta (id) {
    this.servicioPregunta.setIdPregunta(id);
    this.servicioPregunta.setFlagDatosServidor();
    const modalPregunta = this.dialog.open(VerPreguntaComponent, {
      width: '800px'
    });
    modalPregunta.afterClosed().subscribe(result => {
        console.log('ventana cerrada');
    });

  }
  verDiscusion (id) {
    this.servicioPregunta.setIdPregunta(id);
    const modalListaDiscusiones = this.dialog.open(ListadoDiscusionesPreguntaComponent, {
      width: '900px'
    });
    modalListaDiscusiones.afterClosed().subscribe(result => {
      console.log('ventana cerrada');
    });
  }
  verComentarios (id) {
    this.servicioComentario.setidCategoria(id);
    this.servicioComentario.setTipoComentario('pregunta');
    this.router.navigate(['/home', 'verComentarios']);
  }

  eliminarPreguntas (id, pregunta) {
    this.servicioPregunta.eliminarPregunta(id).subscribe((res) => {
      if (res === 200) {
        this.eliminado.show();
        const index = this.listaPreguntas.indexOf(pregunta);
        if (index !== -1){
          this.listaPreguntas.splice(index, 1);
        }
      }else {
        this.error.show();
      }
    });
  }
  editarPregunta(row) {
    console.log(row);
  }

}
