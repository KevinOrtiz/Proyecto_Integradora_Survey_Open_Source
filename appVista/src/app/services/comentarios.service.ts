import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ComentariosService {
  // la idCategoria significa el valor ID de la pregunta, encuesta o discusion,comentario
  // que va cargar los comentarios respectivos
  private idCategoria: string;
  private tipoComentario: string;
  private Listacomentarios = new BehaviorSubject([]);
  private comentarios;
  constructor(private http: HttpClient) {
    this.comentarios = this.Listacomentarios.asObservable();
   }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'x-access-token': '' +  sessionStorage.getItem('token')
    });
    return headers;
  }

  getComentarios () {
    return this.comentarios;
  }


  /**
   * tipo de comentario, se refiere si va guardar un comentario de
   * una pregunta , encuesta, discusiones
   */

  addComentario(comentario: string) {
    const headers = this.getHeaders();
    const url = '/apiRest/guardarComentario';
    const objetoComentario = {
      identificador: '',
      creador: {
        nombre: '',
        ID: sessionStorage.getItem('id')
      },
      contenido: comentario,
      fecha_creacion: new Date(),
      fecha_actualizacion: '',
      likes: 0,
      dislikes: 0,
      favoritos: 0
    };
    return this.http.post(url, {comentario: objetoComentario,
                          tipo: this.getTipoComentario(),
                          idCategoria: this.getidCategoria()},
                          {headers})
                    .map((res: any) => {
                      console.log(res.json());
                      this.Listacomentarios.next(res.json());
                      return res;
                    });
  }

  /**
   * Dependiendo del tipo de evento que haga el usuario Thumps Up o Thumbs Down, este se guardara
   * en la base de datos
   * @param idCreadorComentario Aqui posera el identificador del comentario el cual, usuario esta haciendo referencia
   * @param post: Numero de likes o dislikes que va ingresar el usuario
   * @param tipoPost : Obtendra el tipo de evento Thumbs up, thumbs Down
   */
  addTipoPost (idCreadorComentario: string, post: number, tipoPost: string) {
    const headers = this.getHeaders();
    const url = '/apiRest/addPosts';
    const ObjetoComentario = {
      ID: idCreadorComentario,
      Posts: post,
      tipo: tipoPost
    };
    return this.http.post(url, { comentario: ObjetoComentario},
                          {headers})
                    .map((res: Response) => {
                      return res.json();
                    });
  }


  addFavoritos (idCreadorComentario: string, favorito: number) {
    const headers = this.getHeaders();
    const url = '/apiRest/addFavoritos';
    const objetoComentario = {
      ID: idCreadorComentario,
      favoritos: favorito
    };
    return this.http.post(url, {comentario: objetoComentario}, {headers})
                    .map((res: Response) => {
                      return res.json();
                    });
  }

  listComentarios() {
    const headers = this.getHeaders();
    const url = 'apiRest/loadListComentario/?idcategoria=' + this.getidCategoria() + '&tipocategoria=' + this.getTipoComentario();
    return this.http.get(url, {headers})
                    .map((res: any) => {
                      console.log(res.json());
                      this.Listacomentarios.next(res.json());
                      return res;
                    });
  }

  getListaComentarios () {
    return this.Listacomentarios;
  }


  setidCategoria( idCategoria: string) {
    this.idCategoria = idCategoria;
  }


  getidCategoria() {
    return this.idCategoria;
  }

  setTipoComentario( tipo: string) {
    this.tipoComentario = tipo;
  }
  getTipoComentario() {
    return this.tipoComentario;
  }

}
