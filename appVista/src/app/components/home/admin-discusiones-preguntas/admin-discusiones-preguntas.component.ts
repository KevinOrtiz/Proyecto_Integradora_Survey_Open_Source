import { Component, OnInit, ViewChild,  AfterViewInit } from '@angular/core';
import { DiscusionesService } from '../../../services/discusiones.service';
import { Observable } from 'rxjs/Observable';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { DiscusionPregunta } from '../../../models/discusion-pregunta';
import { PreguntasService } from '../../../services/preguntas.service';
import { MatDialog } from '@angular/material';
import { VerPreguntaComponent } from '../ver-pregunta/ver-pregunta.component';
import { VistaPreviaDiscusionComponent } from '../vista-previa-discusion/vista-previa-discusion.component';
import { EditarDiscusionComponent } from '../editar-discusion/editar-discusion.component';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { ComentariosService } from '../../../services/comentarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-discusiones-preguntas',
  templateUrl: './admin-discusiones-preguntas.component.html',
  styleUrls: ['./admin-discusiones-preguntas.component.css']
})
export class AdminDiscusionesPreguntasComponent implements OnInit, AfterViewInit {
  listaDiscusionesPreguntas: DiscusionPregunta[] = [];
  columnas = ['titulo', 'fecha_creacion' , 'etiquetas', 'opciones'];
  rol = sessionStorage.getItem('rol');
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('eliminado') private eliminado: SwalComponent;
  @ViewChild('error') private error: SwalComponent;
  constructor(private servicioDiscusion: DiscusionesService,
              private servicioPregunta: PreguntasService,
              private servicioComentario: ComentariosService,
              private dialog: MatDialog,
              private router: Router) {
    this.servicioDiscusion.setTipoDiscusion('pregunta');
    this.servicioDiscusion.loadListaMisDiscusiones().subscribe((res) => {
      this.listaDiscusionesPreguntas = res;
      this.dataSource.data = this.listaDiscusionesPreguntas;

    });
   }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filtrarDatos (valor) {
    console.log(valor);
    let filterValue = valor.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  verPregunta(row) {
    console.log(row);
    this.servicioPregunta.setIdPregunta(row['pregunta_ID']);
    this.servicioPregunta.setFlagDatosServidor();
    const modalPregunta = this.dialog.open(VerPreguntaComponent, {
      width: '800px'
    });
    modalPregunta.afterClosed().subscribe(result => {
      console.log('ventana cerrada');
    });
  }
   verDiscusion(row) {
     this.servicioDiscusion.setIdCuerpoDiscusion(row['_id']);
     const modalDiscusion = this.dialog.open(VistaPreviaDiscusionComponent, {
       width: '800px'
     });
     modalDiscusion.afterClosed().subscribe(result => {
      console.log('ventana cerrada');
     });
   }
   editarDiscusion(row) {
     this.servicioDiscusion.setIdCuerpoDiscusion(row['_id']);
     const editarDiscusion = this.dialog.open(EditarDiscusionComponent, {
      width: '960px',
      height: '683px'
     });
     editarDiscusion.afterClosed().subscribe(result => {
      console.log('ventana cerrada');
     });
   }
   verComentarios(row) {
     this.servicioComentario.setidCategoria(row['_id']);
     this.servicioComentario.setTipoComentario('discusionPregunta');
     this.router.navigate(['/home', 'verComentarios']);
   }
   eliminarDiscusion(row) {
     this.servicioDiscusion.setTipoDiscusion('pregunta');
     this.servicioDiscusion.eliminarDiscusion(row['_id'], row['pregunta_ID']).subscribe((res) => {
        if (res['status'] === 200) {
            this.eliminado.show();
        }else {
            this.error.show();
        }
     });
   }


}

