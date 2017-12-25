import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Preguntas } from '../preguntas';



@Injectable()
export class PreguntasService {
  private objetoPregunta: any;
  private contadorIdentificador = 1;
  private vieneDatosServidor = false;
  private idPregunta ;
  private urlServicio = '/apiRest/guardarPregunta' ;
  constructor(private http: HttpClient) {
    this.objetoPregunta = {
      identificador: '',
      descripcion: '',
      usuario_ID: '',
      historial_cambios: {
        texto: ''
      },
      registroActual: false,
      listaImagen: [{
        url: ''
      }],
      etiquetas: {
        texto: ''
      },
      topicos: {
        texto: ''
      },
      respuestas: [{
        id: 0,
        texto: '',
        tipoRespuesta: ''
      }]
    };
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'x-access-token': '' +  sessionStorage.getItem('token')
    });
    return headers;
  }

  getFlagDatosServidor () {
   return this.vieneDatosServidor;
  }
  setIdentificador(idIdentificador) {
    this.objetoPregunta.identificador = this.contadorIdentificador;
    this.contadorIdentificador ++;
  }
  setDescripcion(descripcion) {
    this.objetoPregunta.descripcion = descripcion;
  }
  setIdUsuario() {
    this.objetoPregunta.usuario_ID = sessionStorage.getItem('id');
  }
  setHistorialCambios() {
    this.objetoPregunta.historial_cambios.texto = 'Pregunta Creada';
  }
  setRegistroActual() {
    this.objetoPregunta.registroActual = true;
  }
  setEtiquetas(valorEtiqueta) {
    this.objetoPregunta.etiquetas = valorEtiqueta;
  }
  setTopico(valorTopicos) {
    this.objetoPregunta.topicos = valorTopicos;
  }
  setListaImagenes(urlImagen) {
    this.objetoPregunta.listaImagen = { url: urlImagen };
  }
  setRespuesta(respuestas) {
    this.objetoPregunta.respuestas = respuestas;
  }

  getObjectRespuesta() {
    return this.objetoPregunta;
  }

  enviarPreguntaServidor () {
    const headers = this.getHeaders();
    return this.http.post(this.urlServicio, {pregunta: this.getObjectRespuesta()}, { headers})
                    .map((res: Response) => {
                    return res;
    });
  }

  setFlagDatosServidor() {
    this.vieneDatosServidor = true;
  }
  setIdPregunta (id) {
    this.idPregunta = id;
  }
  loadPregunta() {
    const headers = this.getHeaders();
    const url = '/apiRest/verPregunta/?id=' + this.idPregunta;
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    });
  }
  loadListaPregunta (page) {
    const headers = this.getHeaders();
    const url = '/apiRest/listPreguntas/?page=' + page;
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    });
  }
  loadPreguntasByCategory (categoria, page) {
    const headers = this.getHeaders();
    const url = '/apiRest/queryPreguntas/?topico=' + categoria + '&page=' + page;
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    });
  }


}
