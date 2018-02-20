import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AccionesUsuarioService} from '../../../services/acciones-usuario.service';
import {ComentariosService} from '../../../services/comentarios.service';
import {NotificacionesService} from '../../../services/notificaciones.service';
import {ListaSubComentariosComponent} from '../lista-sub-comentarios/lista-sub-comentarios.component';
import {MensajeAccionesUsuarioComponent} from '../mensaje-acciones-usuario/mensaje-acciones-usuario.component';


@Component({
  selector: 'app-ver-comentarios',
  templateUrl: './ver-comentarios.component.html',
  styleUrls: ['./ver-comentarios.component.scss']
})
export class VerComentariosComponent implements OnInit {
  contenido: string;
  imagen: string;
  usuario: string;
  listaComentarios: any[] = [];
  finished = false;
  page = 0;
  idCreadorPost = '0';
  idCreadorFavoritos = '0';
  valuePost = 1;
  valueFavoritos = 1;
  isLike = false;
  isDislike = false;
  existeDatos = false;
  constructor(private servicioComentario: ComentariosService, private dialogo: MatDialog, private acciones: AccionesUsuarioService,
    private snackBar: MatSnackBar, private servicioNotificacion: NotificacionesService) {
    this.imagen = sessionStorage.getItem('imagen');
    this.usuario = sessionStorage.getItem('nombre') + sessionStorage.getItem('apellido');
    this.servicioComentario.listComentarios(this.page).subscribe((res) => {
      if (res['comentarios']) {
        this.existeDatos = true;
      }
      this.listaComentarios = res['comentarios'];
    });
  }

  ngOnInit() {
  }

  limpiarComentario() {
    this.contenido = '';
  }
  enviarComentario() {
    this.servicioComentario.addComentario(this.contenido).subscribe((res) => {
      if (this.listaComentarios === null) {
        const array = [];
        array.push(res['comentarios']);
        this.listaComentarios = array;
      } else {
        this.listaComentarios.unshift(res['comentarios']);
      }
      this.acciones.setAccion('Comentario añadido de forma exitosa');
      this.snackBar.openFromComponent(MensajeAccionesUsuarioComponent, {
        duration: 500
      });
      this.servicioNotificacion.sendNotificacionAccion(this.servicioNotificacion.getIDreceptor(),
      `se ha creado un comentario a una ${this.servicioComentario.getTipoComentario()}`, 'comentario');

      this.contenido = '';
    });
  }

  addLikes(idCreadorComentario) {
    if (this.idCreadorPost !== idCreadorComentario && this.valuePost === 1) {
      this.idCreadorPost = idCreadorComentario;
      this.isLike = true;
      this.servicioComentario.addTipoPost(idCreadorComentario, this.valuePost, 'likes')
        .subscribe((res) => {
          this.updatePost(res['idComentario'], res['valor'], 'numeroLike');
          this.acciones.setAccion('Me gusta este comentario');
          this.valuePost = -1;
          this.snackBar.openFromComponent(MensajeAccionesUsuarioComponent, {
            duration: 500
          });
        });
    } else {
      if (this.isDislike) {
        this.servicioComentario.addTipoPost(this.idCreadorPost, 1, 'likes')
          .subscribe((res) => {
            this.updatePost(res['idComentario'], res['valor'], 'numeroLike');
            this.acciones.setAccion('Me gusta este comentario');
            this.valuePost = -1;
            this.snackBar.openFromComponent(MensajeAccionesUsuarioComponent, {
              duration: 500
            });
          });
        this.servicioComentario.addTipoPost(this.idCreadorPost, -1, 'dislikes')
          .subscribe((res) => {
            this.isDislike = false;
            this.updatePost(res['idComentario'], res['valor'], 'numeroDislike');
            this.isDislike = false;
          });
      } else {
        this.servicioComentario.addTipoPost(this.idCreadorPost, this.valuePost, 'likes')
          .subscribe((res) => {
            this.updatePost(res['idComentario'], res['valor'], 'numeroLike');
            this.acciones.setAccion('No me gusta este comentario');
            this.valuePost = 1;
            this.snackBar.openFromComponent(MensajeAccionesUsuarioComponent, {
              duration: 500
            });
          });
      }
    }
  }

  addDislike(idCreadorComentario) {
    if (this.idCreadorPost !== idCreadorComentario && this.valuePost === 1) {
      this.idCreadorPost = idCreadorComentario;
      this.isDislike = true;
      this.servicioComentario.addTipoPost(idCreadorComentario, this.valuePost, 'dislikes')
        .subscribe((res) => {
          this.updatePost(res['idComentario'], res['valor'], 'numeroDislike');
          this.valuePost = -1;
        });
    } else {
      if (this.isLike) {
        this.servicioComentario.addTipoPost(this.idCreadorPost, -1, 'likes')
          .subscribe((res) => {
            this.isLike = false;
            this.updatePost(res['idComentario'], res['valor'], 'numeroLike');
          });
        this.servicioComentario.addTipoPost(this.idCreadorPost, 1, 'dislikes')
          .subscribe((res) => {
            this.updatePost(res['idComentario'], res['valor'], 'numeroDislike');
          });

      } else {
        this.servicioComentario.addTipoPost(idCreadorComentario, this.valuePost, 'dislikes')
          .subscribe((res) => {
            this.updatePost(res['idComentario'], res['valor'], 'numeroDislike');
            this.valuePost = 1;
          });

      }
    }
    this.acciones.setAccion('No Me gusta este comentario');
    this.snackBar.openFromComponent(MensajeAccionesUsuarioComponent, {
      duration: 500
    });
  }

  addFavorite(idCreadorComentario) {
    if (this.idCreadorFavoritos !== idCreadorComentario) {
      this.valuePost = 1;
      this.idCreadorFavoritos = idCreadorComentario;
    } else {
      this.valuePost = -1;
    }
    this.servicioComentario.addFavoritos(idCreadorComentario, this.valuePost)
      .subscribe((res) => {
        this.updatePost(res['idComentario'], res['valor'], 'numeroFavorite');
      });
      this.acciones.setAccion('Me encanta este comentario');
      this.snackBar.openFromComponent(MensajeAccionesUsuarioComponent, {
          duration: 500
      });
  }

  onScroll() {
    if (!this.finished) {
      this.page = this.page + 1;
      this.servicioComentario.listComentarios(this.page)
        .subscribe((res) => {
          if (res['comentarios'] !== null && !res['isDoneComentarios']) {
            this.listaComentarios.push.apply(this.listaComentarios, res['comentarios']);
          } else {
            this.finished = true;
          }
        });
    }
  }

  CargarSubcomentario(idComentario) {
    this.servicioComentario.setTipoComentario('comentario');
    this.servicioComentario.setidCategoria(idComentario);
    const modal = this.dialogo.open(ListaSubComentariosComponent, {
      width: '900px'
    });
    modal.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }

  updatePost(idComentario, newValue, tipoPost) {
    this.listaComentarios.filter(comentario => comentario['idComentario'] === idComentario)
      .map((resultados) => {
        resultados[tipoPost] = newValue;
      });
  }




}
