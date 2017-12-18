import { Injectable } from '@angular/core';

@Injectable()
export class RespuestasService {
  private listasRespuestasCasillas= [] ;
  private listasRespuestasRadios = [];
  private contadorCasilla = 1;
  private contadorRadios = 1;
  private contadorListaDesplegable = 1;
  private Puntaje = [];
  private si_no = {id: 3, texto: 'si_no', tipoRespuesta: 'si/no'};
  private descripcion ;
  private listaDeplegable = [];
  constructor() { }

  setListasRespuestasCasillas(value) {
    this.listasRespuestasCasillas.push({id: this.contadorCasilla , texto : value , tipoRespuesta: 'casillas'});
    this.contadorCasilla ++;
  }
  setListasRespuestasRadio(value ) {
    this.listasRespuestasRadios.push({id: this.contadorRadios , texto : value , tipoRespuesta: 'radios'});
    this.contadorRadios ++;
  }
  setListaDesplegable(value) {
    this.listaDeplegable.push({id: this.contadorListaDesplegable , texto : value , tipoRespuesta: 'lista'});
    this.contadorListaDesplegable ++;
  }
  getListaRespuestasCasillas() {
    return this.listasRespuestasCasillas;
  }
  getListaRespuestasRadios() {
    return this.listasRespuestasRadios;
  }

  getListaDesplegable() {
    return this.listaDeplegable;
  }

  deleteValueListaRespuestasCasillas(value) {
    const index = this.getListaRespuestasCasillas().findIndex((item, i) => {
      return item.texto === value;
    });
    if (index > -1 ) {
      this.getListaRespuestasCasillas().splice(index, 1);
      return true;
    }
    return false;
  }
  updateValueListaRespuestasCasillas (oldValue, newValue) {
    const index = this.getListaRespuestasCasillas().findIndex((item, i) => {
      return item.texto === oldValue;
    });
    console.log(this.listasRespuestasCasillas[index]);
    this.listasRespuestasCasillas[index].texto = newValue;
    return true;
  }
  deleteValueListaRespuestasRadio(value) {
    const index = this.getListaRespuestasRadios().findIndex((item, i) => {
      return item.texto === value;
    });
    if (index > -1 ) {
      this.getListaRespuestasRadios().splice(index, 1);
      return true;
    }
    return false;
  }
  updateValueListaRespuestasRadio(oldValue , newValue) {
    const index = this.getListaRespuestasRadios().findIndex((item, i) => {
      return item.texto === oldValue;
    });
    this.listasRespuestasRadios[index].texto = newValue;
    return true;
  }
  deleteValueListaDesplegable(value) {
    const index = this.getListaDesplegable().findIndex((item, i) => {
      return item.texto === value;
    });
    if (index > -1 ) {
      this.getListaDesplegable().splice(index, 1);
      return true;
    }
    return false;
  }
  updateValueListaDesplegable (oldValue, newValue) {
    const index = this.getListaRespuestasRadios().findIndex((item, i) => {
      return item.texto === oldValue;
    });
    this.listaDeplegable[index].texto = newValue;
    return true;
  }
  deleteListaCasillas () {
    this.listasRespuestasCasillas = [];
    this.contadorCasilla = 1;
  }
  deleteListaRadios () {
    this.listasRespuestasRadios = [];
    this.contadorRadios = 1;
  }
  deleteListaDesplegable () {
    this.listaDeplegable = [];
    this.contadorListaDesplegable = 1;
  }

  // {id: this.contadorCasilla , texto : value , tipoRespuesta: 'casillas'}
  setPuntaje (numeroEstrella) {
    let i: number;
    for ( i = 0; i < numeroEstrella; i++) {
      this.Puntaje.push({id: 1, texto: i + 1, tipoRespuesta: 'puntaje'});
    }
  }
  getPuntaje () {
    return this.Puntaje;
  }

  setDescripcion () {
    this.descripcion = {id: 2, texto: 'respuestas abierta', tipoRespuesta: 'abierta'};
  }
  getDescripcion () {
    return this.descripcion;
  }

  getSi_No () {
    return this.si_no;
  }


}
