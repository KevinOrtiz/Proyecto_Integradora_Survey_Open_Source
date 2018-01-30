import { Component, OnInit } from '@angular/core';
import { ComentariosService } from '../../../services/comentarios.service';
import { AccionesUsuarioService } from '../../../services/acciones-usuario.service';
import { MatSnackBar } from '@angular/material';
import { MensajeAccionesUsuarioComponent } from '../mensaje-acciones-usuario/mensaje-acciones-usuario.component';
import { NotificacionesService } from '../../../services/notificaciones.service';

@Component({
  selector: 'app-lista-sub-comentarios',
  templateUrl: './lista-sub-comentarios.component.html',
  styleUrls: ['./lista-sub-comentarios.component.scss']
})
export class ListaSubComentariosComponent implements OnInit {
  contenido: string;
  imagen: string;
  usuario: string;
  listaSubComentarios: any[] = [];
  finished = false;
  page = 0;
  isLike = false;
  isDislike = false;
  idCreadorPost = '0';
  idCreadorFavoritos = '0';
  valuePost = 1;
  valueFavoritos = 1;
  constructor(private servicioComentario: ComentariosService, private acciones: AccionesUsuarioService,
              private snackBar: MatSnackBar, private servicioNotificacion: NotificacionesService) {
    this.imagen = sessionStorage.getItem('imagen');
    this.usuario = sessionStorage.getItem('nombre') + sessionStorage.getItem('apellido');
    this.servicioComentario.listComentarios(this.page).subscribe((res) => {
      this.listaSubComentarios = res['comentarios'];
    });
  }

  ngOnInit() {
  }

  limpiarComentario() {
    this.contenido = '';
  }
  enviarComentario() {
    this.servicioComentario.addComentario(this.contenido).subscribe((res) => {
      if (this.listaSubComentarios === null) {
        const array = [];
        array.push( res['comentarios']);
        this.listaSubComentarios = array;
      }else {
        this.listaSubComentarios.unshift( res['comentarios']);
      }
      this.acciones.setAccion('Comentario anadido de forma exitosa');
      this.snackBar.openFromComponent(MensajeAccionesUsuarioComponent, {
        duration: 500
      });
      this.servicioNotificacion.sendNotificacionAccion(res['comentarios']['idUsuario'],
                              'se ha creado un comentario a un comentario que creaste', 'comentario');
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

  updatePost(idComentario, newValue, tipoPost) {
    this.listaSubComentarios.filter(comentario => comentario['idComentario'] === idComentario)
      .map((resultados) => {
        resultados[tipoPost] = newValue;
      });
  }


}
