import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Encuesta } from '../models/encuesta';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class EncuestasService {
  encuestas: Encuesta;
  idEncuesta = '';
  titulo =  new BehaviorSubject<string>(null);
  titulo$ = this.titulo.asObservable();
  descripcion =  new BehaviorSubject<string>(null);
  descripcion$ = this.descripcion.asObservable();
  url=  new BehaviorSubject<string>(null);
  url$ = this.url.asObservable();
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
    this.titulo.next(titulo);
  }

  gettitulo$ () {
    return this.titulo$;
  }
  getdescripcion$ () {
    return this.descripcion$;
  }

  geturl$ () {
    return this.url$;
  }
  setDescripcion (descripcion) {
    this.encuestas.setDescripcion(descripcion);
    this.descripcion.next(descripcion);
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
    this.url.next(url);
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
    return this.encuestas.getObjectEncuesta();
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
                    })
                    .catch((e) => Observable.throw(this.errorHandler(e)));
  }

  guardarEncuesta () {
    const headers = this.getHeaders();
    const url = 'apiRest/guardarEncuesta';
    return this.http.post(url, {encuesta: this.encuestas.getObjectEncuesta()}, {headers})
                    .map((res: Response) => {
                      return res['status'];
                    })
                    .catch((e) => Observable.throw(this.errorHandler(e)));
  }

  loadEncuesta () {
    const headers = this.getHeaders();
    const url = 'apiRest/loadEncuesta/?id=' + this.getIDEncuesta();
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res['encuesta'];
                    })
                    .catch((e) => Observable.throw(this.errorHandler(e)));
  }

  loadListaMyEncuestas (page, etiqueta) {
    const headers = this.getHeaders();
    const url = 'apiRest/getListaMyEncuestas/?id=' + sessionStorage.getItem('id') +
                '&page=' + page + '&topico=' + etiqueta;
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    })
                    .catch((e) => Observable.throw(this.errorHandler(e)));
  }

  loadEncuestasByCategory (categoria, page) {
    const headers = this.getHeaders();
    const url = 'apiRest/queryEncuestas/?topico=' + categoria + '&page=' + page;
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      console.log(res);
                      return res['listaEncuestas'];
                    })
                    .catch((e) => Observable.throw(this.errorHandler(e)));
  }

  loadListaEncuestas (page) {
    const headers = this.getHeaders();
    const url = '/apiRest/listEncuestas/?page=' + page;
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      console.log(res['listaEncuestas']);
                      return res['listaEncuestas'];
                    })
                    .catch((e) => Observable.throw(this.errorHandler(e)));
  }

  deleteAllMyEncuestas () {
    const headers = this.getHeaders();
    const url = '/apiRest/deleteAllMyEncuestas/?usuario_ID=' + sessionStorage.getItem('id');
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res['eliminado'];
                    })
                    .catch((error) => Observable.throw(this.errorHandler(error)));
  }

  deleteMyEncuesta (id) {
    const headers = this.getHeaders();
    const url = '/apiRest/deleteEncuesta/?id=' + id;
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    })
                    .catch((error) => Observable.throw(this.errorHandler(error)));
  }

  loadListaMisDiscusiones(): Observable<Object[]> {
    const headers = this.getHeaders();
    const url = '/apiRest/loadListadoDiscusionesFromEncuesta/?id=' + this.getIDEncuesta();
    return this.http.get<Object[]>(url, {headers})
                    .map((res) => {
                        return res['listaDiscusiones'];
                    })
                    .catch((error) => Observable.throw(this.errorHandler(error)));
  }
  errorHandler(error) {
    console.log(error);
  }
}
