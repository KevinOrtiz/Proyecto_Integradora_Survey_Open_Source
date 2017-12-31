import { Component, OnInit } from '@angular/core';
import { ComentariosService } from '../../../services/comentarios.service';

@Component({
  selector: 'app-lista-sub-comentarios',
  templateUrl: './lista-sub-comentarios.component.html',
  styleUrls: ['./lista-sub-comentarios.component.css']
})
export class ListaSubComentariosComponent implements OnInit {
  contenido: string;
  imagen: string;
  usuario: string;
  listaSubComentarios: any[] = [];
  finished = false;
  page = 0;
  like = 0;
  dislike = 0;
  favorite = 0;
  constructor(private servicioComentario: ComentariosService) {
    this.imagen = sessionStorage.getItem('imagen');
    this.usuario = sessionStorage.getItem('nombre') + sessionStorage.getItem('apellido');
    this.servicioComentario.listComentarios(this.page).subscribe((res) => {
      console.log(res['comentarios']);
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
      console.log(res);
      if (this.listaSubComentarios === null) {
        const array = [];
        array.push( res['comentarios']);
        this.listaSubComentarios = array;
      }else {
        this.listaSubComentarios.unshift( res['comentarios']);
      }
    });
  }

  addLikes(idCreadorComentario) {
    this.servicioComentario.addTipoPost(idCreadorComentario, 1, 'likes')
                           .subscribe((res) => {
                             console.log(res);
                           });
  }

  addDislike(idCreadorComentario) {
    this.servicioComentario.addTipoPost(idCreadorComentario, 1, 'dislikes')
                           .subscribe((res) => {
                            console.log(res);
                           });
  }

  addFavorite(idCreadorComentario) {
    this.servicioComentario.addFavoritos(idCreadorComentario, 1)
                           .subscribe((res) => {
                            console.log(res);
                           });
  }


}
