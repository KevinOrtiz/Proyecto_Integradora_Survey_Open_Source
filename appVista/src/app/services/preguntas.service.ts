import { Injectable } from '@angular/core';

@Injectable()
export class PreguntasService {
  private objetoPregunta: any;
  private contadorIdentificador = 1;
  private vieneDatosServidor = false;
  constructor() {
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

}
