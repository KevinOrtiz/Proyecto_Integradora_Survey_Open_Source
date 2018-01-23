import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Encuesta } from '../models/encuesta';


@Injectable()
export class EncuestasService {
  encuestas: Encuesta;
  idEncuesta: string;
  constructor(private http: HttpClient) {
    this.encuestas = new Encuesta();
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'x-access-token': '' +  sessionStorage.getItem('token')
    });
    return headers;
  }

  setTitulo (titulo) {
    this.encuestas.setTitulo(titulo);
  }

  setDescripcion (descripcion) {
    this.encuestas.setDescripcion(descripcion);
  }

  setUsuarioID (id) {
    this.encuestas.setUsuarioID(id);
  }

  setIDEncuesta (id) {
    this.idEncuesta = id;
  }
  getIDEncuesta () {
    return this.idEncuesta;
  }
  setImagen (url) {
    this.encuestas.setlogoEncuesta(url);
  }

  setHistorialCambios (texto) {
    this.encuestas.setHistorialCambios(texto);
  }

  getHistorialCambios () {
     return this.getHistorialCambios();
  }
  addTagEncuesta (etiqueta) {
    this.encuestas.addEtiqueta(etiqueta);
    return true;
  }
  addPregunta (respuesta) {
    this.encuestas.addPreguntaLista(respuesta);
    return true;
  }
  deleteTagEncuesta (tag) {
    this.encuestas.removeTagEncuesta(tag);
    return true;
  }
  deleteRespuesta (respuesta) {
    this.encuestas.removePreguntaLista(respuesta);
    return true;
  }
  getObjectEncuesta () {
    this.encuestas.getObjectEncuesta();
  }
  getTitulo () {
   return  this.encuestas.getTitulo();
  }
  getDescripcion () {
    return this.encuestas.getDescripcion();
  }

  getLogoEncuesta() {
    return this.encuestas.getlogoEncuesta();
  }

  getTagEncuesta () {
    return this.encuestas.getEtiqueta();
  }

  getPreguntas () {
    return this.encuestas.getListaPreguntas();
  }

  loadlistaPreguntasValidas(page) {
    const headers = this.getHeaders();
    const url = 'apiRest/getPreguntasValidas/?page=' + page;
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res['listaPreguntas'];
                    });
  }

  guardarEncuesta () {
    const headers = this.getHeaders();
    const url = 'apiRest/guardarEncuesta';
    return this.http.post(url, {encuesta: this.encuestas.getObjectEncuesta()}, {headers})
                    .map((res: Response) => {
                      return res['status'];
                    });
  }

  loadEncuesta () {
    const headers = this.getHeaders();
    const url = 'apiRest/loadEncuesta/?id=' + this.getIDEncuesta();
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res['encuesta'];
                    });
  }

  loadListaMyEncuestas () {
    const headers = this.getHeaders();
    const url = 'apiRest/getListaMyEncuestas/?usuario_ID=' + sessionStorage.getItem('id');
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res['listaMyEncuestas'];
                    });
  }

  loadEncuestasByCategory (categoria, page) {
    const headers = this.getHeaders();
    const url = 'apiRest/queryEncuestas/?topico=' + categoria + '&page=' + page;
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    });
  }

  loadListaEncuestas (page) {
    const headers = this.getHeaders();
    const url = '/apiRest/listEncuestas/?page=' + page;
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    });
  }
}
