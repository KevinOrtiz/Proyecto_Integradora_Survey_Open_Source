import { Injectable } from '@angular/core';

@Injectable()
export class CategoriasEtiquetasService {
  private listaEtiquetas: any []= [];
  private listaCategorias: any[] = [];
  private categoria;
  private etiqueta;
  constructor() { }

  getCategorias () {
    return this.listaCategorias;
  }

  setListaCategorias (listaCategorias) {
    this.listaCategorias = listaCategorias;
  }

  setCategoria (valorCategoria) {
    this.categoria = valorCategoria;
  }

  setEtiqueta (valorEtiqueta) {
    this.etiqueta = valorEtiqueta;
  }

  getCategoria () {
    return this.categoria;
  }

  getEtiqueta () {
    console.log(this.etiqueta);
    return this.etiqueta;
  }

}
