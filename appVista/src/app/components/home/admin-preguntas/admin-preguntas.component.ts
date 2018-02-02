import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PreguntasService } from '../../../services/preguntas.service';
import { DiscusionesService } from '../../../services/discusiones.service';
import { TablePreguntas } from '../../../models/table-preguntas';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { MatDialog } from '@angular/material';
import { VerPreguntaComponent } from '../ver-pregunta/ver-pregunta.component';
import { ListadoDiscusionesPreguntaComponent } from '../listado-discusiones-pregunta/listado-discusiones-pregunta.component';
import { ComentariosService } from '../../../services/comentarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-preguntas',
  templateUrl: './admin-preguntas.component.html',
  styleUrls: ['./admin-preguntas.component.scss']
})
export class AdminPreguntasComponent implements OnInit, AfterViewInit {
  listaPreguntas: TablePreguntas[] = [];
  columnas = ['etiquetas', 'descripcion', 'opciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('eliminado') private eliminado: SwalComponent;
  @ViewChild('error') private error: SwalComponent;
  constructor(private servicioPregunta: PreguntasService,
              private servicioDiscusion: DiscusionesService,
              private dialog: MatDialog, private servicioComentario: ComentariosService,
              private router: Router) {
                this.servicioPregunta.loadListaMisPreguntas().subscribe((res) => {
                  console.log(res);
                  this.listaPreguntas = res;
                  this.dataSource.data = this.listaPreguntas;
                });
              }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filtrarDatos (valor) {
    let filterValue = valor.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  verPregunta (row) {
    this.servicioPregunta.setIdPregunta(row['_id']);
    this.servicioPregunta.setFlagDatosServidor();
    const modalPregunta = this.dialog.open(VerPreguntaComponent, {
      width: '800px'
    });
    modalPregunta.afterClosed().subscribe(result => {
        console.log('ventana cerrada');
    });

  }
  verDiscusion (row) {
    this.servicioPregunta.setIdPregunta(row['_id']);
    const modalListaDiscusiones = this.dialog.open(ListadoDiscusionesPreguntaComponent, {
      width: '900px'
    });
    modalListaDiscusiones.afterClosed().subscribe(result => {
      console.log('ventana cerrada');
    });
  }
  verComentarios (row) {
    this.servicioComentario.setidCategoria(row['_id']);
    this.servicioComentario.setTipoComentario('pregunta');
    this.router.navigate(['/home', 'verComentarios']);
  }

  eliminarPreguntas (row) {
    this.servicioPregunta.eliminarPregunta(row['_id']).subscribe((res) => {
      if (res === 200) {
        this.eliminado.show();
      }else {
        this.error.show();
      }
    });
  }
  editarPregunta(row) {
    console.log(row);
  }

}
