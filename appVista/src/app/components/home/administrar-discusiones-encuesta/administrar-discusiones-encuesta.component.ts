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
import {DiscusionesService} from "../../../services/discusiones.service";
import {EncuestasService} from "../../../services/encuestas.service";
import {EditarDiscusionEncuestaComponent} from "../editar-discusion-encuesta/editar-discusion-encuesta.component";
import {VerDiscusionEncuestaComponent} from "../ver-discusion-encuesta/ver-discusion-encuesta.component";
import {VerEncuestaComponent} from "../ver-encuesta/ver-encuesta.component";

@Component({
  selector: 'app-administrar-discusiones-encuesta',
  templateUrl: './administrar-discusiones-encuesta.component.html',
  styleUrls: ['./administrar-discusiones-encuesta.component.scss']
})
export class AdministrarDiscusionesEncuestaComponent implements OnInit {
  numberPages=1;
  pageActual = 1;
  listadiscusionEncuesta =[];
  searchField: FormControl;
  BusquedaFinalizada = false;
  textoBusqueda = '';
  @ViewChild('eliminado') private eliminado: SwalComponent;
  @ViewChild('error') private error: SwalComponent;
  constructor(private servicioDiscusion: DiscusionesService,
              private servicioEncuesta: EncuestasService,
              private servicioComentario: ComentariosService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.servicioDiscusion.setTipoDiscusion('encuesta');
    this.searchField = new FormControl;
    this.searchField.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(etiqueta => this.servicioDiscusion.loadListaMisDiscusiones(1, etiqueta))
      .subscribe((res)=>{
        this.listadiscusionEncuesta = res['listadiscusionEncuesta'];
        this.numberPages = res['pages'];
        this.BusquedaFinalizada = true;
      })
  }
  
  next(){
    this.pageActual = this.pageActual + 1;
    this.servicioDiscusion.loadListaMisDiscusiones(this.pageActual, this.textoBusqueda)
      .subscribe((res)=>{
        this.listadiscusionEncuesta = res['listadiscusionEncuesta'];
        this.numberPages = res['pages'];
      })
  }
  
  previous(){
    if (this.pageActual > 1){
      this.pageActual = this.pageActual - 1;
      this.servicioDiscusion.loadListaMisDiscusiones(this.pageActual, this.textoBusqueda)
        .subscribe((res) => {
          this.listadiscusionEncuesta = res['listadiscusionEncuesta'];
          this.numberPages = res['pages'];
        })
    }
  }
  
  verEncuesta(id){
    this.servicioEncuesta.setIDEncuesta(id);
    const modalEncuesta = this.dialog.open(VerEncuestaComponent, {
      width: '1000px'
    });
    modalEncuesta.afterClosed().subscribe(result => {
    
    });
  }
  
  verDiscusion(id) {
    this.servicioDiscusion.setIdCuerpoDiscusion(id);
    const modalDiscusion = this.dialog.open(VerDiscusionEncuestaComponent, {
      width: '800px'
    });
    modalDiscusion.afterClosed().subscribe(result => {
      console.log('ventana cerrada');
    });
  }
  editarDiscusion(id) {
    this.servicioDiscusion.setIdCuerpoDiscusion(id);
    const editarDiscusion = this.dialog.open(EditarDiscusionEncuestaComponent, {
      width: '960px',
      height: '683px'
    });
    editarDiscusion.afterClosed().subscribe(result => {
      console.log('ventana cerrada');
    });
  }
  verComentarios(id) {
    this.servicioComentario.setidCategoria(id);
    this.servicioComentario.setTipoComentario('discusionEncuesta');
    this.router.navigate(['/home', 'verComentarios']);
  }
  eliminarDiscusion(id, encuestaID, discusion) {
    this.servicioDiscusion.setTipoDiscusion('encuesta');
    this.servicioDiscusion.eliminarDiscusion(id, encuestaID).subscribe((res) => {
      if (res['status'] === 200) {
        this.eliminado.show();
        const index = this.listadiscusionEncuesta.indexOf(discusion);
        if (index !== -1){
          this.listadiscusionEncuesta.splice(index, 1);
        }
      }else {
        this.error.show();
      }
    });
  }




}
