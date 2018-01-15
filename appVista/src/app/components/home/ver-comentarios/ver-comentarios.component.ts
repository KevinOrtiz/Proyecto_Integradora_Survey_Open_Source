import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ComentariosService } from '../../../services/comentarios.service';
import { MatDialog } from '@angular/material';
import { ListaSubComentariosComponent } from '../lista-sub-comentarios/lista-sub-comentarios.component';


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
  constructor(private servicioComentario: ComentariosService, private dialogo: MatDialog) {
    this.imagen = sessionStorage.getItem('imagen');
    this.usuario = sessionStorage.getItem('nombre') + sessionStorage.getItem('apellido');
    console.log(this.imagen);
    console.log(this.usuario);
    this.servicioComentario.listComentarios(this.page).subscribe((res) => {
      if (res['comentarios'] ) {
        this.existeDatos = true;
      }
      this.listaComentarios = res['comentarios'];
      console.log(this.listaComentarios);
    });
   }

  ngOnInit() {
  }

  limpiarComentario() {
    this.contenido = '';
  }
  enviarComentario() {
    this.servicioComentario.addComentario(this.contenido).subscribe((res) => {
      console.log('*********');
      console.log(res);
      console.log('**********');
      console.log(this.listaComentarios);
      console.log('************');
      if (this.listaComentarios === null) {
        const array = [];
        array.push( res['comentarios']);
        this.listaComentarios = array;
      }else {
        this.listaComentarios.unshift( res['comentarios']);
      }
      this.contenido = '';
    });
  }

  addLikes(idCreadorComentario) {
    // esto lo hago por que si el usuario le quiere quitar los likes a un comentario
    console.log(idCreadorComentario);
    console.log(this.idCreadorPost);
    if (this.idCreadorPost !== idCreadorComentario) {
      this.valuePost = 1;
      this.idCreadorPost = idCreadorComentario;
      this.isLike = true;
      this.servicioComentario.addTipoPost(idCreadorComentario, this.valuePost, 'likes')
      .subscribe((res) => {
       console.log(res);
       this.updatePost(res['idComentario'], res['valor'], 'numeroLike');
      });
    }else {
      this.valuePost = -1;
      if (this.isDislike) {
        this.servicioComentario.addTipoPost(this.idCreadorPost, 1 , 'likes')
        .subscribe((res) => {
          this.updatePost(res['idComentario'], res['valor'], 'numeroLike');
          console.log(res);
        });
        this.servicioComentario.addTipoPost(this.idCreadorPost, -1, 'dislikes')
        .subscribe((res) => {
          this.updatePost(res['idComentario'], res['valor'], 'numeroDislike');
          this.isDislike = false;
          console.log(res);
        });

      }else {
        this.servicioComentario.addTipoPost(this.idCreadorPost, this.valuePost, 'likes')
                               .subscribe((res) => {
                                console.log(res);
                                this.updatePost(res['idComentario'], res['valor'], 'numeroLike');
            });

      }
    }
  }

  addDislike(idCreadorComentario) {
    if (this.idCreadorPost !== idCreadorComentario) {
      this.valuePost = 1;
      this.idCreadorPost = idCreadorComentario;
      this.isDislike = true;
      this.servicioComentario.addTipoPost(idCreadorComentario, this.valuePost, 'dislikes')
      .subscribe((res) => {
       console.log(res);
       this.updatePost(res['idComentario'], res['valor'], 'numeroDislike');
      });

    }else {
      this.valuePost = -1;
      if (this.isLike) {
        this.servicioComentario.addTipoPost(this.idCreadorPost, -1 , 'likes')
        .subscribe((res) => {
          this.isLike = false;
          this.updatePost(res['idComentario'], res['valor'], 'numeroLike');
          console.log(res);
        });
        this.servicioComentario.addTipoPost(this.idCreadorPost, 1, 'dislikes')
        .subscribe((res) => {
          this.updatePost(res['idComentario'], res['valor'], 'numeroDislike');
          console.log(res);
        });

      }else {
        this.servicioComentario.addTipoPost(idCreadorComentario, this.valuePost, 'dislikes')
                               .subscribe((res) => {
                                console.log(res);
                                this.updatePost(res['idComentario'], res['valor'], 'numeroDislike');
                              });

        }
    }
  }

  addFavorite(idCreadorComentario) {
    if (this.idCreadorFavoritos !== idCreadorComentario) {
      this.valuePost = 1;
      this.idCreadorFavoritos = idCreadorComentario;
    }else {
      this.valuePost = -1;
    }
    this.servicioComentario.addFavoritos(idCreadorComentario, this.valuePost)
                           .subscribe((res) => {
                            console.log(res);
                            this.updatePost(res['idComentario'], res['valor'], 'numeroFavorite');
                            console.log('******');
                           });
  }

  onScroll() {
    console.log('entra');
    if (!this.finished) {
      this.page = this.page + 1;
      this.servicioComentario.listComentarios(this.page)
                             .subscribe((res) => {
                               console.log('entreee');
                              if (res['comentarios'] !== null && !res['isDoneComentarios']) {
                                  this.listaComentarios.push.apply(this.listaComentarios, res['comentarios']);
                              }else {
                                console.log('entro');
                                this.finished = true;
                              }
                             });
    }
  }

  CargarSubcomentario(idComentario) {
    console.log(idComentario);
    this.servicioComentario.setTipoComentario('comentario');
    this.servicioComentario.setidCategoria(idComentario);
    const modal = this.dialogo.open(ListaSubComentariosComponent, {
      width: '900px'
    });
    modal.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }

  updatePost(idComentario , newValue, tipoPost) {
    this.listaComentarios.filter(comentario => comentario['idComentario'] === idComentario)
                          .map((resultados) => {
                            console.log('*******');
                            console.log(resultados);
                            console.log('**********');
                            resultados[tipoPost] = newValue;
                          });
  }




}
