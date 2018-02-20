import {Component, OnInit, ViewChild} from '@angular/core';
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
import {EditarDiscusionComponent} from '../editar-discusion/editar-discusion.component';
import {VerPreguntaComponent} from '../ver-pregunta/ver-pregunta.component';
import {VistaPreviaDiscusionComponent} from '../vista-previa-discusion/vista-previa-discusion.component';


@Component({
  selector: 'app-admin-discusiones-preguntas',
  templateUrl: './admin-discusiones-preguntas.component.html',
  styleUrls: ['./admin-discusiones-preguntas.component.scss']
})
export class AdminDiscusionesPreguntasComponent implements OnInit{
  
  numberPages = 1;
  pageActual = 1;
  listadiscusion = [];
  searchField: FormControl;
  BusquedaFinalizada = false;
  textoBusqueda = '';
  @ViewChild('eliminado') private eliminado: SwalComponent;
  @ViewChild('error') private error: SwalComponent;
  constructor(private servicioDiscusion: DiscusionesService,
              private servicioPregunta: PreguntasService,
              private servicioComentario: ComentariosService,
              private dialog: MatDialog,
              private router: Router) {
   }

  ngOnInit() {
    this.servicioDiscusion.setTipoDiscusion('pregunta');
    this.searchField = new FormControl;
    this.searchField.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(etiqueta => this.servicioDiscusion.loadListaMisDiscusiones(1, etiqueta))
      .subscribe((res) => {
        this.listadiscusion = res['listadiscusionPregunta'];
        this.numberPages = res['pages'];
        this.BusquedaFinalizada = true;
      });
  
  }
  
  next() {
    this.pageActual = this.pageActual + 1;
    this.servicioDiscusion.loadListaMisDiscusiones(this.pageActual,this.textoBusqueda)
      .subscribe((res)=>{
        this.listadiscusion = res['listadiscusionPregunta'];
        this.numberPages = res['pages'];
  
      });
  }
  
  previous() {
    if (this.pageActual > 1){
      this.pageActual = this.pageActual - 1;
      this.servicioDiscusion.loadListaMisDiscusiones(this.pageActual, this.textoBusqueda)
        .subscribe((res) => {
          this.listadiscusion = res['listadiscusionPregunta'];
          this.numberPages = res['pages'];
        })
    }
  };

  verPregunta(id) {
    this.servicioPregunta.setIdPregunta(id);
    this.servicioPregunta.setFlagDatosServidor();
    const modalPregunta = this.dialog.open(VerPreguntaComponent, {
      width: '800px'
    });
    modalPregunta.afterClosed().subscribe(result => {
      console.log('ventana cerrada');
    });
  }
   verDiscusion(id) {
     this.servicioDiscusion.setIdCuerpoDiscusion(id);
     const modalDiscusion = this.dialog.open(VistaPreviaDiscusionComponent, {
       width: '800px'
     });
     modalDiscusion.afterClosed().subscribe(result => {
      console.log('ventana cerrada');
     });
   }
   editarDiscusion(id) {
     this.servicioDiscusion.setIdCuerpoDiscusion(id);
     const editarDiscusion = this.dialog.open(EditarDiscusionComponent, {
      width: '960px',
      height: '683px'
     });
     editarDiscusion.afterClosed().subscribe(result => {
      console.log('ventana cerrada');
     });
   }
   verComentarios(id) {
     this.servicioComentario.setidCategoria(id);
     this.servicioComentario.setTipoComentario('discusionPregunta');
     this.router.navigate(['/home', 'verComentarios']);
   }
   eliminarDiscusion(id, preguntaID, discusion) {
     this.servicioDiscusion.setTipoDiscusion('pregunta');
     this.servicioDiscusion.eliminarDiscusion(id, preguntaID).subscribe((res) => {
        if (res['status'] === 200) {
            this.eliminado.show();
            const index = this.listadiscusion.indexOf(discusion);
            if (index !== -1){
              this.listadiscusion.splice(index, 1);
            }
        }else {
            this.error.show();
        }
     });
   }


}

