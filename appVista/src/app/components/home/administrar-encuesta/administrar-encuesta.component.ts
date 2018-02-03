import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EncuestasService } from '../../../services/encuestas.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { VerEncuestaComponent } from '../ver-encuesta/ver-encuesta.component';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { ListadoDiscusionesEncuestaComponent } from '../listado-discusiones-encuesta/listado-discusiones-encuesta.component';


@Component({
  selector: 'app-administrar-encuesta',
  templateUrl: './administrar-encuesta.component.html',
  styleUrls: ['./administrar-encuesta.component.scss']
})
export class AdministrarEncuestaComponent implements OnInit {
  numberPages = 0;
  pageActual = 1;
  listaMisEncuestas: Object [] = [];
  searchField: FormControl;
  BusquedaFinalizada = false;
  textoBusqueda = '';
  @ViewChild('input') input: ElementRef;
  @ViewChild('eliminado') private eliminado: SwalComponent;
  @ViewChild('errorEliminar') private errorEliminar: SwalComponent;
  constructor(private servicioEncuesta: EncuestasService,
              private modal: MatDialog,
              private router: Router) {
  }


  ngOnInit() {
    this.searchField = new FormControl;
    this.searchField.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .do((value) => {
          if (this.textoBusqueda === '') {
            this.BusquedaFinalizada = false;
          }
        })
        .switchMap(etiqueta => this.servicioEncuesta.loadListaMyEncuestas(1, etiqueta))
        .subscribe((res) => {
            this.listaMisEncuestas = res['listaMyEncuestas'];
            this.numberPages = res['paginas'];
        });
  }

  eliminarTodasMisEncuestas() {
    this.servicioEncuesta.deleteAllMyEncuestas().subscribe((response) => {
      if (response) {
        this.listaMisEncuestas = [];
        this.eliminado.show();
      }else {
        this.errorEliminar.show();
      }
    });
  }

  previous() {
    if (this.pageActual > 1) {
      this.pageActual = this.pageActual - 1 ;
      this.servicioEncuesta.loadListaMyEncuestas(this.pageActual, this.textoBusqueda)
                         .subscribe((res) => {
                            this.listaMisEncuestas = res['listaMyEncuestas'];
                            this.numberPages = res['paginas'];
                         });
    }
  }

  next() {
    this.pageActual = this.pageActual + 1;
    this.servicioEncuesta.loadListaMyEncuestas(this.pageActual, this.textoBusqueda)
                         .subscribe((res) => {
                            this.listaMisEncuestas = res['listaMyEncuestas'];
                            this.numberPages = res['paginas'];
                         });
  }

  verEncuesta(id) {
    this.servicioEncuesta.setIDEncuesta(id);
    this.modal.open(VerEncuestaComponent, {
      width: '1000px'
    });
  }

  verListadoDiscusiones(id) {
    this.servicioEncuesta.setIDEncuesta(id);
    const modalListaDiscusionesEncuesta = this.modal.open(ListadoDiscusionesEncuestaComponent, {
      width : '900px'
    });
    modalListaDiscusionesEncuesta.afterClosed().subscribe(result => {
      console.log('ventana cerrada');
    });
  }

  editarEncuesta(id) {
    this.servicioEncuesta.setIDEncuesta(id);
    this.router.navigate(['/home', 'editarEncuesta' ]);
  }

  eliminarEncuesta (id, encuesta) {
    console.log(id);
    this.servicioEncuesta.deleteMyEncuesta(id).subscribe((response) => {
      if (response['status'] === 200 && response['eliminado']) {
        this.eliminado.show();
        const index = this.listaMisEncuestas.indexOf(encuesta);
        console.log(index);
        if (index !== -1) {
          this.listaMisEncuestas.splice(index, 1);
        }
      } else {
        this.errorEliminar.show();
      }
      console.log(response['result']);
    });
  }

  compartirEncuesta(id) {
    console.log(id);
  }

  responderEncuesta(id) {
    console.log(id);
  }

  verResultados(id) {
    console.log(id);
  }

}
