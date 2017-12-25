import { Component, OnInit } from '@angular/core';
import { ComentariosService } from '../../../services/comentarios.service';

@Component({
  selector: 'app-ingresar-comentarios',
  templateUrl: './ingresar-comentarios.component.html',
  styleUrls: ['./ingresar-comentarios.component.css']
})
export class IngresarComentariosComponent implements OnInit {
  contenido: string;
  imagen: string;
  usuario: string;
  constructor(private servicioComentarios: ComentariosService) {
    this.imagen = sessionStorage.getItem('imagen');
    this.usuario = sessionStorage.getItem('nombre') + sessionStorage.getItem('apellido');
  }

  ngOnInit() {
  }
  limpiarComentario() {
    this.contenido = '';
  }
  enviarComentario() {
    this.servicioComentarios.addComentario(this.contenido).subscribe((res) => {
      console.log(res);
    });
  }

}
