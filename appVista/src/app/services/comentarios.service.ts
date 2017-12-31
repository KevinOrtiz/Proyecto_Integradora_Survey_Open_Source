import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';



@Injectable()
export class ComentariosService {
  // la idCategoria significa el valor ID de la pregunta, encuesta o discusion,comentario
  // que va cargar los comentarios respectivos
  private idCategoria: string;
  private tipoComentario: string;
  constructor(private http: HttpClient) {
   }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'x-access-token': '' +  sessionStorage.getItem('token')
    });
    return headers;
  }

  /**
   * tipo de comentario, se refiere si va guardar un comentario de
   * una pregunta , encuesta, discusiones
   */

  addComentario(comentario: string) {
    const headers = this.getHeaders();
    const url = '/apiRest/guardarComentario';
    const objetoComentario = {
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
                    .map((res: Response) => {
                      console.log(res);
                      return res;
                    });
  }

  errorHandler(error) {
    console.log(error);
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
                      return res;
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
                      return res;
                    });
  }

  listComentarios(pagina) {
    const headers = this.getHeaders();
    console.log(this.getTipoComentario());
    // tslint:disable-next-line:max-line-length
    const url = 'apiRest/loadListComentario/?idcategoria=' + this.getidCategoria()
    + '&tipocategoria=' + this.getTipoComentario() + '&page=' + pagina;
    console.log(url);
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      console.log(res);
                      return res;
                    });
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
