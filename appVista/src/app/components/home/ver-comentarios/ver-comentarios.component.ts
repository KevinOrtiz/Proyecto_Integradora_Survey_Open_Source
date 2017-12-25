import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ComentariosService } from '../../../services/comentarios.service';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-ver-comentarios',
  templateUrl: './ver-comentarios.component.html',
  styleUrls: ['./ver-comentarios.component.css']
})
export class VerComentariosComponent implements OnInit {
  listaComentarios: any[] = [];
  finished = false;
  subscripcion: Subscription;
  constructor(private servicioComentario: ComentariosService, private dialogo: MatDialog) {
   }

  ngOnInit() {
    this.subscripcion = this.servicioComentario.getComentarios()
                                               .subscribe((item) => {
                                                 console.log(item);
                                                 this.listaComentarios = item;
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

  onScroll() {
    console.log('ya mismo lo hago');
  }

  CargarSubcomentario(idComentario) {
    this.servicioComentario.setTipoComentario('comentario');
    this.servicioComentario.setidCategoria(idComentario);
    this.servicioComentario.listComentarios().subscribe((res) => {
      console.log(res);
    });
    const modal = this.dialogo.open(VerComentariosComponent, {
      width: '900px',
      height: '900px'
    });
    modal.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }



}
