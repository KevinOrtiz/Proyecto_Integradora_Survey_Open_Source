import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl} from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { EncuestasService } from '../../../services/encuestas.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { NotificacionesService } from '../../../services/notificaciones.service';

@Component({
  selector: 'app-compartir-encuesta',
  templateUrl: './compartir-encuesta.component.html',
  styleUrls: ['./compartir-encuesta.component.scss']
})
export class CompartirEncuestaComponent implements OnInit {

  @ViewChild('actualizarRolColaborador') actualizarRolColaborador: SwalComponent;
  @ViewChild('rolDesignadoUsuario') rolDesignadoUsuario: SwalComponent;
  @ViewChild('usuarioEliminadoEncuesta') usuarioEliminadoEncuesta: SwalComponent;
  @ViewChild('addColaboradorEncuesta') addColaboradorEncuesta: SwalComponent;
  @ViewChild('errorAccionColaborador') errorAccionColaborador: SwalComponent;
  @ViewChild('usuarioAnadidoEncuesta') usuarioAnadidoEncuesta: SwalComponent;
  private nombre = '';
  private pagina = 1;
  private searchField: FormControl;
  private listaUsuarios: Object [] = [];
  private rol = '';
  private rolColaborador = '';
  private finished = false;
  private tituloEncuesta = '';
  private listaColaboradores: Object[] = [];

  constructor(private servicioEncuesta: EncuestasService, private servicioNotificacion: NotificacionesService) {
    this.servicioEncuesta.loadListaMisColaboradores().subscribe((res) => {
        this.listaColaboradores = res;
    });
    this.servicioEncuesta.loadEncuesta().subscribe((res) => {
      this.tituloEncuesta = res['titulo'];
    });
   }


  ngOnInit() {
    this.searchField = new FormControl;
    this.searchField.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .switchMap(nombre => this.servicioEncuesta.loadListaUsuarios(nombre, this.pagina))
        .subscribe((res) => {
          this.listaUsuarios = res;
          this.finished = true;
          this.pagina = 1;
        });
  }

  addColaborador(id) {
    this.servicioEncuesta.addUsuarioEncuesta(id, this.rol).subscribe((res) => {
        if (res['status'] === 200) {
          this.addColaboradorEncuesta.show();
          const mensaje = `${sessionStorage.getItem('nombre')} te ha invitado en la encuesta
                          ${this.tituloEncuesta} para que puedas ${this.rol}`;
          this.servicioNotificacion.sendNotificacionAccion(id, mensaje, 'añadir-colaborador');
          if (this.listaColaboradores === null) {
            this.listaColaboradores = [res['encuesta']];
          }else {
            this.listaColaboradores.push(res['encuesta']);

          }

        }else if (res['status'] === 304) {
          this.usuarioAnadidoEncuesta.show();

        }else if (res['status'] === 500) {
          this.errorAccionColaborador.show();


        }
    });
  }

  loadUsuarios () {
    this.pagina ++;
    this.servicioEncuesta.loadListaUsuarios(this.nombre, this.pagina).subscribe((response) => {
      this.listaUsuarios.push.apply(this.listaUsuarios, response);
    });
  }

  actualizarColaborador (id, colaboradorID) {
    this.servicioEncuesta.actualizarRolColaboradorEncuesta(id, colaboradorID, this.rolColaborador).subscribe((res) => {
        if (res['status'] === 200) {
            this.actualizarRolColaborador.show();
            this.listaColaboradores.filter(colaborador => colaborador['_id'] === id)
                                   .map((resultados) => {
                                     resultados['rol'] = this.rolColaborador;
                                   });
            const mensaje = `${sessionStorage.getItem('nombre')} te ha actualizado tu rol en la encuesta
            ${this.tituloEncuesta} para que puedas ${this.rol}`;
            this.servicioNotificacion.sendNotificacionAccion(colaboradorID, mensaje, 'actualizado-rol-encuesta');

        } else if (res['status'] === 304) {
            this.rolDesignadoUsuario.show();

        } else if (res['status'] === 500) {
            this.errorAccionColaborador.show();

        }
    });

  }

  eliminarColaborador (id) {
    this.servicioEncuesta.deletecolaboradorEncuesta(id).subscribe((res) => {
      if (res['status'] === 200) {
        this.usuarioEliminadoEncuesta.show();
        console.log(this.listaColaboradores.filter(colaborador => colaborador['_id'] === id));
      } else if (res['status'] === 500) {
        this.errorAccionColaborador.show();
      }
    });
  }

}
